const express = require('express');
const router = express.Router();
import CommentController from '../controller/CommentController';
import Auth from '../middleware/auth';
// Get comment
router.get('/post/:postId', Auth.setUser, CommentController.getCommentsByPostId);
router.get(
    '/:commentPostId/reply',
    Auth.setUser,
    CommentController.getReplyCommentsOfCommentPost
);

// Create comment
router.post('/post/:postId', Auth.origin, CommentController.insertCommentPost);
router.post(
    '/:commentPostId/reply',
    Auth.origin,
    CommentController.insertReplyComment
);

// Edit commnet
router.put("/reply/:commentReplyId/edit",Auth.origin,CommentController.editCommentReply)
router.put("/:commentPostId/edit",Auth.origin,CommentController.editCommentPost)

// Delete comment
router.delete(
    '/reply/:replyCommentId',
    Auth.origin,
    CommentController.removeReplyComment
);
router.delete(
    '/:commentPostId',
    Auth.origin,
    CommentController.removeCommentPost
);
// Like comment
router.post('/:commentId/like', Auth.origin, CommentController.likeCommentPost);
router.post(
    '/reply/:commentId/like',
    Auth.origin,
    CommentController.likeReplyComment
);
router.post(
    '/:commentId/unlike',
    Auth.origin,
    CommentController.unlikeCommentPost
);
router.post(
    '/reply/:commentId/unlike',
    Auth.origin,
    CommentController.unlikeReplyComment
);

module.exports = router;
