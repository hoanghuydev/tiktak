import { pagingConfig } from '../utils/pagination';
import { Op, literal, where } from 'sequelize';
import db, { sequelize } from '../models';
import { formatQueryUser } from './user';

/**
 * @typedef {Object} LikeCommentModel
 * @property {number} liker - The ID of the liker.
 * @property {number} commentId - The ID of the comment.
 */

/**
 * React to a comment.
 * @param {LikeCommentModel} likeCommentModel - The comment object.
 * @param {"unlike"|"like"} [typeAction="like"] - The type of action.
 * @returns {Promise<void>} A promise that resolves when the action is complete.
 */
export const reactComment = (likeCommentModel, typeAction = 'like') =>
    new Promise(async (resolve, reject) => {
        try {
            // Check comment exists or not
            const comment = await db.Comment.findByPk(
                likeCommentModel.commentId
            );
            if (!comment) resolve(false);
            // insert/destroy record to like/unlike comment
            if (typeAction == 'like') {
                const resp = await db.LikeComment.create(likeCommentModel);
                resolve(resp);
            } else {
                const resp = await db.LikeComment.destroy({
                    where: likeCommentModel,
                });
                resolve(resp);
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
/**
 * Check liked comment
 * @param {number} commentId - The ID of the comment
 * @returns {Promise<void>} A promise that resolves when the action is complete.
 */
export const checkLikeComment = (commentId) =>
    new Promise((resolve, reject) => {
        try {
            const isLiked = db.LikeComment.findOne({
                where: {
                    commentId,
                },
            });
            resolve(isLiked);
        } catch (error) {
            reject(error);
        }
    });

export const getComments = (
    postId,
    parentCommentId,
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
            if (postId) commentQuery.postId = postId;
            if (parentCommentId) commentQuery.parentCommentId = parentCommentId;
            else commentQuery.parentCommentId = null;
            const commonQuery = {
                where: commentQuery,
                include: [
                    {
                        model: db.User,
                        attributes: ['id', 'userName', 'fullName'],
                        ...formatQueryUser,
                        as: 'commenterData',
                        where: userQuery,
                    },
                ],
                attributes: {
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM likesComment lc
                                WHERE
                                  lc.commentId = comment.id
                                )`),
                            'likes',
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM comments cr
                                WHERE
                                  cr.parentCommentId = comment.id
                                )`),
                            'replies',
                        ],
                    ],
                },
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
                                lc.commentId = Comment.id
                                AND u.id = ${req.user.id}
                        )
                    )`),
                    'isLiked',
                ]);
            }

            const { count, rows } = await db.Comment.findAndCountAll({
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

export const findCommentById = (id) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Comment.findByPk(id);
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
/**
 * @typedef {Object} CommentModel
 * @property {number} commenter - The ID of the commenter.
 * @property {number} postId - The ID of the post.
 * @property {string} content - The content of the comment.
 */

/**
 * Insert comment post.
 * @param {CommentModel} commentModel - The comment object.
 */
export const insertComment = (commentModel) =>
    new Promise(async (resolve, reject) => {
        try {
            const resp = await db.Comment.create(commentModel);
            resolve(resp);
        } catch (error) {
            reject(error);
        }
    });
export const removeComment = (commentId) =>
    new Promise(async (resolve, reject) => {
        const transaction = await sequelize.transaction();
        try {
            // Recursive function to delete comments and their replies
            const deleteCommentAndReplies = async (id) => {
                // Step 1: Remove likes for the current comment
                await db.LikeComment.destroy({
                    where: { commentId: id },
                    transaction,
                });

                // Step 2: Find all replies to the current comment
                const replies = await db.Comment.findAll({
                    where: { parentCommentId: id },
                    attributes: ['id'], // Only fetch the IDs of the replies
                    transaction,
                });

                // Step 3: Collect reply IDs
                const replyIds = replies.map((reply) => reply.id);

                // Step 4: Remove likes for all replies in bulk
                if (replyIds.length > 0) {
                    await db.LikeComment.destroy({
                        where: { commentId: replyIds }, // Bulk delete likes for all reply IDs
                        transaction,
                    });
                }

                // Step 5: Recursively delete each reply and its replies
                for (const reply of replies) {
                    await deleteCommentAndReplies(reply.id);
                }

                // Step 6: Remove the current comment itself
                await db.Comment.destroy({
                    where: { id },
                    transaction,
                });
            };

            // Start the deletion process from the provided commentId
            await deleteCommentAndReplies(commentId);

            // Commit the transaction
            await transaction.commit();
            resolve(true);
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            reject(error);
        }
    });

export const updateComment = (id, content) =>
    new Promise(async (resolve, reject) => {
        try {
            const updated = await db.Comment.update(
                { content },
                {
                    where: { id },
                }
            );
            resolve(updated);
        } catch (error) {
            reject(error);
        }
    });
