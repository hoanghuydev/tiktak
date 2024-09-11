import { Op, literal, where } from 'sequelize';
import db, { Sequelize, sequelize } from '../models';
import { pagingConfig } from '../utils/pagination';
import { query } from 'express';
import { formatQueryUser } from './user';
export const getReplyCommentsOfCommentPost = (
    commentPostId,
    {
        page,
        pageSize,
        orderBy,
        orderDirection,
        userName,
        userId,
        fullName,
        content,
    },
    req
) =>
    new Promise(async (resolve, reject) => {
        try {
            const pagingQuery = pagingConfig(
                page,
                pageSize,
                orderBy,
                orderDirection
            );
            const userQuery = {};
            if (userName) userQuery.userName = { [Op.substring]: userName };
            if (fullName) userQuery.fullName = { [Op.substring]: fullName };
            if (userId) userQuery.id = userId;
            const commentQuery = {};
            if (content) commentQuery.content = { [Op.substring]: content };
            const commonQuery = {
                where: commentQuery,
                include: [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        ...formatQueryUser,
                        as: 'responderData',
                        where: userQuery,
                    },
                    {
                        model: db.CommentPost,
                        attributes: ['id'],
                        as: 'commentPostData',
                        where: { id: commentPostId },
                    },
                ],
                attributes : {
                    include : [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM likesComment lc
                                WHERE
                                  lc.commentId = commentReply.id
                                  AND lc.isCommentPost = false
                                )`),
                            'likes'
                        ]
                        
                    ]
                }
            };
            if (req.user) {
                commonQuery.attributes.include.push([
                    literal(`
                    (
                        SELECT EXISTS (
                            SELECT 1
                            FROM likesComment lc
                            JOIN users u ON lc.liker = u.id
                            WHERE
                                lc.commentId = commentReply.id
                                AND lc.isCommentPost = false
                                AND u.id = ${req.user.id}
                        )
                    )`),
                    'isLiked'
                ])
            }
            const { count, rows } = await db.CommentReply.findAndCountAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
                ...commonQuery,
                ...pagingQuery,
            });
            const totalItems = count;
            const totalPages =
                totalItems / pageSize >= 1
                    ? Math.ceil(totalItems / pageSize)
                    : 1;
            resolve({
                comments: rows,
                pagination: {
                    orderBy: pagingQuery.orderBy,
                    page: pagingQuery.offset + 1,
                    pageSize: pagingQuery.limit,
                    orderDirection: pagingQuery.orderDirection,
                    totalItems,
                    totalPages,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
export const findCommentReplyById = (id) =>
    new Promise(async(resolve,reject)=> {
        try {
            const resp = await db.CommentReply.findByPk(id);
            resolve(resp)
        } catch (error) {
            reject(error)
        }
    })
/**
 * @typedef {Object} CommentReplyModel
 * @property {number} responder - The ID of the responder.
 * @property {number} commentPostId - The ID of the comment post.
 * @property {string} content - The content of the comment reply.
 */

/**
 * Insert reply comment
 * @param {CommentReplyModel} commentReplyModel - The comment reply object.
 */
export const insertCommentReply = (commentReplyModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.CommentReply.create(commentReplyModel);
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removeCommentReply = (commentReplyId) =>
    new Promise(async (resolve, reject) => {
        const transaction = await sequelize.transaction();
        try {
            const removeLikeCommentReply = await db.LikeComment.destroy({
                where : {
                    commentId : commentReplyId,
                    isCommentPost : false
                }
            })
            const deleted = await db.CommentReply.destroy({
                where: { id: commentReplyId },
            });
            await transaction.commit();
            resolve(deleted);
        } catch (error) {
            await transaction.rollback();
            reject(error);
        }
    });
export const removeCommentReplyByCommentPostId = (commentPostId) => 
    new Promise(async (resolve,reject)=> {
        const transaction = await sequelize.transaction();
    try {
        await db.CommentReply.destroy({
            where: { commentPostId },
            transaction
        });
        await db.LikeComment.destroy({
            where: {
                commentId: {
                    [Sequelize.Op.in]: sequelize.literal(`(
                        SELECT id FROM CommentsReply 
                        WHERE commentPostId = ${commentPostId} 
                        )`)
                },
                isCommentPost : false
            },
            transaction
        });
        await transaction.commit();
        resolve(true)
    } catch (error) {
        await transaction.rollback();
        reject(error)
    }
    })


export const updateCommentReply = (id,content) =>
    new Promise(async (resolve, reject) => {
        try {
            const updated = await db.CommentReply.update({
                content 
            }, {
                where: { id },
            });
            resolve(updated);
        } catch (error) {
            reject(error);
        }
    });
