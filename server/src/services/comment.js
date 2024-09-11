import { Op, where } from 'sequelize';
import db from '../models';
import { pagingConfig } from '../utils/pagination';
import { query } from 'express';
import { badRequest } from '../utils/handleResp';
/**
 * @typedef {Object} LikeCommentModel
 * @property {number} liker - The ID of the liker.
 * @property {number} commentId - The ID of the comment.
 * @property {boolean} isCommentPost - Is comment of post or not (comment reply).
 */

/**
 * React to a comment.
 * @param {LikeCommentModel} likeCommentModel - The comment object.
 * @param {"unlike"|"like"} [typeAction="like"] - The type of action.
 * @returns {Promise<void>} A promise that resolves when the action is complete.
 */
export const reactComment = (
    likeCommentModel,
    typeAction = 'like',
) =>
    new Promise(async (resolve, reject) => {
        try {
            // Check comment exists or not
            if (likeCommentModel.isCommentPost) {
                const comment = await db.CommentPost.findByPk(likeCommentModel.commentId);
                if (!comment)
                    resolve(false)
                
            } else {
                const commentReply = await db.CommentReply.findByPk(likeCommentModel.commentId);
                if (!commentReply)
                    resolve(false)
            }
            // insert/destroy record to like/unlike comment
            if (typeAction=="like") {
                const resp = await db.LikeComment.create(likeCommentModel)
                resolve(resp);
            } else {
                const resp = await db.LikeComment.destroy({
                    where : likeCommentModel
                })
                resolve(resp);
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
/**
 * React to a comment.
 * @param {LikeCommentModel} likeCommentModel - The comment object.
 * @returns {Promise<void>} A promise that resolves when the action is complete.
 */
export const checkLikeComment = (likeCommentModel) => 
    new Promise((resolve,reject)=> {
        try {
            const isLiked = db.LikeComment.findOne({
                where : likeCommentModel
            })
            resolve(isLiked)
        } catch (error) {
            reject(error)
        }
    })