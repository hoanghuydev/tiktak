const express = require('express');
const router = express.Router();
import CommentController from '../controllers/CommentController';
import Auth from '../middleware/auth';
// Get comment
router.get(
    '/post/:postId',
    Auth.setUser,
    CommentController.getCommentsByPostId
);
router.get(
    '/:parentCommentId/reply',
    Auth.setUser,
    CommentController.getReplyCommentsOfCommentPost
);

// Create comment
router.post('/post/:postId', Auth.origin, CommentController.insertCommentPost);
router.post(
    '/post/:postId/:parentCommentId/reply',
    Auth.origin,
    CommentController.insertReplyComment
);

// Edit commnet

router.put('/:commentId/edit', Auth.origin, CommentController.editComment);

// Delete comment

router.delete('/:commentId', Auth.origin, CommentController.removeComment);
// Like comment
router.post('/:commentId/like', Auth.origin, CommentController.likeComment);

router.post('/:commentId/unlike', Auth.origin, CommentController.unlikeComment);

module.exports = router;
