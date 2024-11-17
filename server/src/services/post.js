import { Op, col, fn, literal, where } from 'sequelize';
import db, { Sequelize } from '../models';
import { paginationResponse, pagingConfig } from '../utils/pagination';
import { formatQueryUserWithAvatarData } from './user';
import post from '../models/post';
import {
    VISIBILITY_POST_FRIEND,
    VISIBILITY_POST_PRIVATE,
    VISIBILITY_POST_PUBLIC,
} from '../../constant';
/**
 * @typedef {Object} ConditionModel
 * @property {number} visibility - The ID of the liker.
 */
/**
 *
 * @param {number} userId - Current user ID
 * @param {"following" | "all" | "friends"} type - Get list video according to type of page
 * @returns {ConditionModel[]} - List of conditions for visibility
 */
function getVisibilityConditions(userId, type) {
    const conditions = [];
    switch (type) {
        case 'all':
            conditions.push({ visibility: VISIBILITY_POST_PUBLIC });
            if (userId) {
                conditions.push(
                    {
                        visibility: VISIBILITY_POST_FRIEND,
                        poster: {
                            [Op.in]: literal(
                                `(
                                SELECT f1.followee
                            FROM followers f1
                            JOIN followers f2 ON f1.followee = f2.follower
                            WHERE f1.follower = ${userId}
                            AND f2.followee = ${userId}
                            )`
                            ),
                        },
                    },
                    { visibility: VISIBILITY_POST_PRIVATE, poster: userId }
                );
            }
            break;
        case 'friends':
            if (userId)
                conditions.push({
                    visibility: {
                        [Op.or]: [
                            VISIBILITY_POST_PUBLIC,
                            VISIBILITY_POST_FRIEND,
                        ],
                    },
                    poster: {
                        [Op.in]: literal(
                            ` (SELECT f1.followee
                        FROM followers f1
                        JOIN followers f2 ON f1.followee = f2.follower
                        WHERE f1.follower = ${userId}
                        AND f2.followee = ${userId})`
                        ),
                    },
                });
            break;
        case 'following':
            if (userId)
                conditions.push({
                    visibility: {
                        [Op.or]: [
                            VISIBILITY_POST_PUBLIC,
                            VISIBILITY_POST_FRIEND,
                        ],
                    },
                    poster: {
                        [Op.in]: literal(
                            `(SELECT f1.followee
                        FROM followers f1
                        WHERE f1.follower = ${userId})`
                        ),
                    },
                });
            break;
        default:
            conditions.push({ visibility: VISIBILITY_POST_PUBLIC });
            if (userId) {
                conditions.push(
                    {
                        visibility: VISIBILITY_POST_FRIEND,
                        poster: {
                            [Op.in]: literal(
                                ` (SELECT f1.followee
                            FROM followers f1
                            JOIN followers f2 ON f1.followee = f2.follower
                            WHERE f1.follower = ${userId}
                            AND f2.followee = ${userId})`
                            ),
                        },
                    },
                    { visibility: VISIBILITY_POST_PRIVATE, poster: userId }
                );
            }
            break;
    }
    return conditions;
}
export const getPosts = (
    postId,
    type = 'all',
    { page, pageSize, orderBy, orderDirection, userId, title },
    req
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                title ? 'likes' : orderBy,
                title ? 'DESC' : orderDirection
            );
            const query = {};
            const getPostWithVisibility = getVisibilityConditions(
                req?.user?.id,
                type
            );
            query.where = {
                [Op.or]: getPostWithVisibility,
            };

            if (postId) query.where.id = postId;
            // Give title in req.query to search videos with title
            if (title) query.where.title = { [Op.substring]: title };
            query.include = [];
            if (userId)
                query.include.push({
                    model: db.User,
                    attributes: ['id', 'userName', 'fullName'],
                    as: 'posterData',
                    where: { id: userId },
                    ...formatQueryUserWithAvatarData,
                });
            else
                query.include.push({
                    model: db.User,
                    attributes: ['id', 'userName', 'fullName'],
                    as: 'posterData',
                    ...formatQueryUserWithAvatarData,
                });
            query.attributes = {
                include: [
                    [
                        literal(`(
                                  SELECT COUNT(*)
                                  FROM likesPost
                                  WHERE
                                    likesPost.postId = post.id
                                    
                              )`),
                        'likes',
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*)
                                  FROM comments cp
                                  WHERE
                                    cp.postId = post.id
                            )`),
                        'comments',
                    ],
                ],
            };

            if (req?.user) {
                query.attributes.include.push([
                    literal(`(
                        SELECT EXISTS (
                            SELECT 1
                            FROM followers f
                            JOIN posts p ON p.poster = f.followee
                            JOIN users u ON u.id = f.followee
                            WHERE 
                                f.follower = ${req.user.id} 
                                AND p.poster = u.id 
                                AND post.id = p.id 
                                AND post.poster = p.poster
                        )
                        )`),
                    'isFollow',
                ]);
                query.attributes.include.push([
                    literal(`(
                        SELECT EXISTS (
                            SELECT 1
                            FROM followers f1
                            JOIN followers f2 ON f1.follower = f2.followee AND f1.followee = f2.follower
                            JOIN posts p ON p.poster = f1.followee
                            JOIN users u ON u.id = p.poster
                            WHERE f1.follower = ${req.user.id}
                              AND f2.followee = ${req.user.id}
                              AND post.id = p.id
                        )                           
                      )`),
                    'isFriend',
                ]);
                query.attributes.include.push([
                    literal(`(
                        SELECT EXISTS (
                            SELECT 1
                            FROM likesPost lp,posts p
                            WHERE lp.liker = ${req.user.id} AND p.id = lp.postId AND post.id = p.id
                        )
                        )`),
                    'isLiked',
                ]);
                query.attributes.include.push([
                    literal(`(
                        SELECT EXISTS (
                            SELECT 1
                            FROM posts p
                            WHERE p.poster = ${req.user.id} AND post.id = p.id
                        )
                        )`),
                    'isMe',
                ]);
            }
            const getPostsQuery = Object.assign(query, queries);
            const { count, rows } = await db.Post.findAndCountAll(
                getPostsQuery
            );

            resolve({
                posts: rows,
                ...paginationResponse(queries, pageSize, page, count),
            });
        } catch (error) {
            reject(error);
        }
    });

export const getOne = (id) =>
    new Promise((resolve, reject) => {
        try {
            const post = db.Post.findOne({
                where: { id },
                include: [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        as: 'posterData',
                        ...formatQueryUserWithAvatarData,
                    },
                ],
            });
            resolve(post);
        } catch (error) {
            reject(error);
        }
    });
export const insertPost = ({
    poster,
    title,
    thumnailUrl,
    thumnailId,
    videoUrl,
    videoId,
}) =>
    new Promise((resolve, reject) => {
        try {
            const resp = db.Post.create({
                poster,
                title,
                thumnailUrl,
                thumnailId,
                videoUrl,
                videoId,
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.destroy({
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const updatePost = (id, postModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.update(postModel, {
                where: {
                    id,
                },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const watchPost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.update(
                { views: Sequelize.literal('views + 1') },
                {
                    where: {
                        id,
                    },
                }
            );
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const sharePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.update(
                { shares: Sequelize.literal('shares + 1') },
                {
                    where: {
                        id,
                    },
                }
            );
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const deletePost = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Post.destroy({
                where: { id },
            });
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
