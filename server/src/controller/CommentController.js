import { content } from 'googleapis/build/src/apis/content';
import * as commentPostServices from '../services/commentPost';
import * as commentReplyServices from '../services/commentReply';
import * as commentServices from '../services/comment';
import * as postServices from '../services/post';

import { badRequest, forBidden, internalServerError } from '../utils/handleResp';
/**
 * @typedef {Object} CommentPostModel
 * @property {number} commenter - The ID of the commenter.
 * @property {number} postId - The ID of the post.
 * @property {string} content - The content of the comment.
 */

/**
 * @typedef {Object} CommentReplyModel
 * @property {number} responder - The ID of the responder.
 * @property {number} commentPostId - The ID of the comment post.
 * @property {string} content - The content of the comment reply.
 */
class CommentController {
    async getCommentsByPostId(req, res) {
        try {
            const comments = await commentPostServices.getCommentsByPostId(
                req.params.postId,
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
            const comments =
                await commentReplyServices.getReplyCommentsOfCommentPost(
                    req.params.commentPostId,
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
            const postId = req.params.postId
            const post = await postServices.getOne(postId);
            if (!post) return badRequest("Not found post",res)
            const comment = await commentPostServices.insertCommentPost({
                commenter: req.user.id,
                postId,
                content: req.body.content,
            });
            if (comment)
                return res.status(200).json({
                    err: 0,
                    mes: 'Commented',
                    comment
                });
            else 
                return badRequest("Some error occured",res)
            
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async insertReplyComment(req, res) {
        try {
            const commentPostId = req.params.commentPostId
            const commentPost = await commentPostServices.findCommentById(commentPostId)
            if (!commentPost) return badRequest("Not found comment to reply",res)
            const comment = await commentReplyServices.insertCommentReply({
                responder: req.user.id,
                commentPostId,
                content: req.body.content,
            });
            if (comment)
                return res.status(200).json({
                    err: 0,
                    mes: 'Replied comment',
                    comment

                });
            else 
                return badRequest("Some error occured",res)
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }

    async editCommentPost(req,res) {
        try {
            const {content} = req.body
            const {commentPostId} = req.params
            if (!content) return badRequest("Please enter content",res)
                /**
                 * @type {CommentPostModel}
                 */
            const comment = await commentPostServices.findCommentById(commentPostId)
            if (!comment) return badRequest("Not found comment",res)
            if (comment.commenter!=req.user.id) return forBidden("For bidden",res)
            const resp = commentPostServices.updateCommentPost(commentPostId,content)
            comment.content = content
            if (resp) 
                return res.status(200).json({
                    err : 0,
                    mes : 'Edited comment',
                    comment
                })
            else return badRequest("Some error occured",res)
            
        } catch (error) {
            console.log(error);
            return internalServerError(res)
        }
    }
    async editCommentReply(req,res) {
        try {
            const {content} = req.body
            const {commentReplyId} = req.params
            if (!content) return badRequest("Please enter content",res)
                /**
                 * @type {CommentReplyModel}
                 */
            const comment = await commentReplyServices.findCommentReplyById(commentReplyId)
            if (!comment) return badRequest("Not found comment",res)
            if (comment.responder!=req.user.id) return forBidden("For bidden",res)
            const resp = commentReplyServices.updateCommentReply(commentReplyId,content)
            comment.content = content
            if (resp) 
                return res.status(200).json({
                    err : 0,
                    mes : 'Replied comment',
                    comment
                })
            else return badRequest("Some error occured",res)
        } catch (error) {
            console.log(error);
            return internalServerError(res)
        }
    }
    async removeCommentPost(req, res) {
        try {
            const deleted = await commentPostServices.removeCommentPost(
                req.params.commentPostId
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
    async removeReplyComment(req, res) {
        try {
            const deleted = await commentReplyServices.removeCommentReply(
                req.params.replyCommentId
            );
            if (deleted)
                return res.status(200).json({
                    err: 0,
                    mes: 'Removed comment reply',
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
    * @property {boolean} isCommentPost - Is comment of post or not (comment reply).
    */
    async likeCommentPost(req, res) {
        try {
            /**
            * @type {LikeCommentModel}
            */
            const likeCommentModel = {
                liker : req.user.id,
                commentId : req.params.commentId,
                isCommentPost : true
            }
            const isLiked = await commentServices.checkLikeComment(likeCommentModel)
            if (isLiked) return badRequest("You're already like this comment",res)
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
    async likeReplyComment(req, res) {
        try {
            /**
            * @type {LikeCommentModel}
            */
             const likeCommentModel = {
                liker : req.user.id,
                commentId : req.params.commentId,
                isCommentPost : false
            }
            const isLiked = await commentServices.checkLikeComment(likeCommentModel)
            if (isLiked) return badRequest("You're already like this comment",res)
            const liked = await commentServices.reactComment(
                likeCommentModel,
                'like'
            );
            if (liked)
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
    async unlikeCommentPost(req, res) {
        try {
            
             /**
            * @type {LikeCommentModel}
            */
             const likeCommentModel = {
                liker : req.user.id,
                commentId : req.params.commentId,
                isCommentPost : true
            }
            const isLiked = await commentServices.checkLikeComment(likeCommentModel)
            if (!isLiked) return badRequest("You're not like this comment yet",res)
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

    async unlikeReplyComment(req, res) {
        try {
            /**
            * @type {LikeCommentModel}
            */
            const likeCommentModel = {
                liker : req.user.id,
                commentId : req.params.commentId,
                isCommentPost : false
            }
            const isLiked = await commentServices.checkLikeComment(likeCommentModel)
            if (!isLiked) return badRequest("You're not like this comment yet",res)
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
