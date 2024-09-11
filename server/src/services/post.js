import { Op, col, fn, literal, where } from 'sequelize';
import db, { Sequelize } from '../models';
import { pagingConfig } from '../utils/pagination';
import { formatQueryUser } from './user';
import post from '../models/post';
import { VISIBILITY_POST_FRIEND, VISIBILITY_POST_PRIVATE, VISIBILITY_POST_PUBLIC } from '../../constant';
export const getPosts = (
    postId,
    { page, pageSize, orderBy, orderDirection, userId, title },
    req
) =>
    new Promise(async (resolve, reject) => {
        try {
            const queries = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const query = {};
            const getPostWithVisibility = [
                { visibility: VISIBILITY_POST_PUBLIC },
            ];
            if (req.user?.id) {
                getPostWithVisibility.push(
                    {
                        visibility: VISIBILITY_POST_FRIEND,
                        poster: {
                            [Op.in]: literal(`(
                            SELECT f1.followee
                            FROM followers f1
                            JOIN followers f2 ON f1.followee = f2.follower
                            WHERE f1.follower = ${req.user.id}
                            AND f2.followee = ${req.user.id}
                        )`),
                        },
                    },
                    { visibility: VISIBILITY_POST_PRIVATE, poster: req.user.id }
                );
            }
            query.where = {
                [Op.or]: getPostWithVisibility,
            };

            if (postId) query.where.id = postId;
            if (title) query.where.title = { [Op.substring]: title };

            query.include = [];
            if (userId)
                query.include.push({
                    model: db.User,
                    attributes: ['id', 'userName', 'fullName'],
                    as: 'posterData',
                    where: { id: userId },
                    ...formatQueryUser,
                });
            else
                query.include.push({
                    model: db.User,
                    attributes: ['id', 'userName', 'fullName'],
                    as: 'posterData',
                    ...formatQueryUser,
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
                                  FROM commentsPost cp
                                  WHERE
                                    cp.postId = post.id
                            )`),
                            'comments'
                    ]
                ],
            };

            if (req.user) {
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
                          FROM followers f
                          JOIN posts p ON p.poster = f.followee
                          JOIN users u ON u.id = f.followee
                          WHERE f.follower = ${req.user.id}
                            AND p.poster = u.id
                            AND post.id = p.id
                            AND post.poster = p.poster
                        )
                        AND EXISTS (
                          SELECT 1
                          FROM followers f
                          JOIN posts p ON p.poster = f.follower
                          JOIN users u ON u.id = f.follower
                          WHERE f.followee = ${req.user.id}
                            AND p.poster = u.id
                            AND post.id = p.id
                            AND post.poster = p.poster
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
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                posts: rows,
                pagination: {
                    orderBy: queries.orderBy,
                    page: queries.offset + 1,
                    pageSize: queries.limit,
                    orderDirection: queries.orderDirection,
                    totalItems,
                    totalPages,
                },
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
                        ...formatQueryUser,
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
