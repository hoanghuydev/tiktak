import { content } from 'googleapis/build/src/apis/content';
import * as commentServices from '../services/comment';
import * as postServices from '../services/post';

import {
    badRequest,
    forBidden,
    internalServerError,
} from '../utils/handleResp';
/**
 * @typedef {Object} CommentPostModel
 * @property {number} commenter - The ID of the commenter.
 * @property {number} postId - The ID of the post.
 * @property {string} content - The content of the comment.
 */

/**
 * @typedef {Object} CommentReplyModel
 * @property {number} responder - The ID of the responder.
 * @property {number} commentId - The ID of the comment post.
 * @property {string} content - The content of the comment reply.
 */
class CommentController {
    async getCommentsByPostId(req, res) {
        try {
            const comments = await commentServices.getComments(
                req.params.postId,
                req.params.parentCommentId,
                req.query,
                req
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...comments,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async getReplyCommentsOfCommentPost(req, res) {
        try {
            const comments = await commentServices.getComments(
                req.params.postId,
                req.params.parentCommentId,
                req.query,
                req
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...comments,
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async insertCommentPost(req, res) {
        try {
            const postId = req.params.postId;
            const post = await postServices.getOne(postId);
            if (!post) return badRequest('Not found post', res);
            const comment = await commentServices.insertComment({
                commenter: req.user.id,
                postId,
                content: req.body.content,
            });
            if (comment)
                return res.status(200).json({
                    err: 0,
                    mes: 'Commented',
                    comment,
                });
            else return badRequest('Some error occured', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async insertReplyComment(req, res) {
        try {
            const { postId, parentCommentId } = req.params;
            const commentPost = await commentServices.findCommentById(
                parentCommentId
            );
            if (!commentPost)
                return badRequest('Not found comment to reply', res);
            const comment = await commentServices.insertComment({
                commenter: req.user.id,
                postId,
                parentCommentId,
                content: req.body.content,
            });
            if (comment)
                return res.status(200).json({
                    err: 0,
                    mes: 'Replied comment',
                    comment,
                });
            else return badRequest('Some error occured', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async editComment(req, res) {
        try {
            const { content } = req.body;
            const { commentId } = req.params;
            if (!content) return badRequest('Please enter content', res);
            /**
             * @type {CommentPostModel}
             */
            const comment = await commentServices.findCommentById(commentId);
            if (!comment) return badRequest('Not found comment', res);
            if (comment.commenter != req.user.id)
                return forBidden('For bidden', res);
            const resp = commentServices.updateComment(commentId, content);
            comment.content = content;
            if (resp)
                return res.status(200).json({
                    err: 0,
                    mes: 'Edited comment',
                    comment,
                });
            else return badRequest('Some error occured', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async removeComment(req, res) {
        try {
            const deleted = await commentServices.removeComment(
                req.params.commentId
            );
            if (deleted)
                return res.status(200).json({
                    err: 0,
                    mes: 'Removed comment post',
                });
            else return badRequest('Not found comment', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    /**
     * @typedef {Object} LikeCommentModel
     * @property {number} liker - The ID of the liker.
     * @property {number} commentId - The ID of the comment.
     */
    async likeComment(req, res) {
        try {
            /**
             * @type {LikeCommentModel}
             */
            const likeCommentModel = {
                liker: req.user.id,
                commentId: req.params.commentId,
            };
            const isLiked = await commentServices.checkLikeComment(
                req.params.commentId
            );
            if (isLiked)
                return badRequest("You're already like this comment", res);
            const like = await commentServices.reactComment(
                likeCommentModel,
                'like'
            );
            if (like)
                return res.status(200).json({
                    err: 0,
                    mes: 'Liked comment',
                });
            else badRequest('Not found comment', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async unlikeComment(req, res) {
        try {
            /**
             * @type {LikeCommentModel}
             */
            const likeCommentModel = {
                liker: req.user.id,
                commentId: req.params.commentId,
            };
            const isLiked = await commentServices.checkLikeComment(
                req.params.commentId
            );
            if (!isLiked)
                return badRequest("You're not like this comment yet", res);
            const unliked = await commentServices.reactComment(
                likeCommentModel,
                'unlike'
            );
            if (unliked)
                return res.status(200).json({
                    err: 0,
                    mes: 'Unliked comment',
                });
            else badRequest('Not found comment', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new CommentController();
