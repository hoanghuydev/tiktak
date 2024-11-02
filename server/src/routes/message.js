const express = require('express');
const router = express.Router();
import Auth from '../middleware/auth';
import MessageController from '../controller/MessageController';
const multer = require('multer');
const upload = multer();
router.get(
    '/chatroom/:chatroomId',
    Auth.isInChatroom,
    MessageController.getMessagesOfChatroom
);
router.get(
    '/upload/image',
    upload.fields([{ name: 'images', maxCount: 10 }]),
    Auth.origin,
    MessageController.uploadImage
);
router.post(
    '/chatroom/:chatroomId',
    Auth.isInChatroom,
    MessageController.sendMessage
);
router.delete(
    '/:messageId/user/:userId',
    Auth.origin,
    MessageController.deleteMessageForUser
);
router.delete('/:messageId', Auth.origin, MessageController.recallMessage);
router.delete(
    '/up-to-now',
    Auth.origin,
    MessageController.deleteAllMessagesUpToNowForUser
);

module.exports = router;
