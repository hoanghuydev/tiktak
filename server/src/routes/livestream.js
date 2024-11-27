const express = require('express');
const router = express.Router();
import Auth from '../middleware/auth';
import MessageController from '../controllers/MessageController';
router.get(
    '/:chatroomId',
    Auth.isInChatroom,
    MessageController.getMessagesOfChatroom
);
router.post('/:chatroomId', Auth.isInChatroom, MessageController.sendMessage);
router.delete(
    '/:messageId/user/:userId',
    Auth.isSeftUser,
    MessageController.recallMessage
);
module.exports = router;
