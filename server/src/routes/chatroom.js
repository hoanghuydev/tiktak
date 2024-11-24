const express = require('express');
const router = express.Router();
import ChatroomController from '../controller/ChatroomController';
import Auth from '../middleware/auth';
router.get(
    '/user/:userId',
    Auth.isSeftUser,
    ChatroomController.getChatroomsOfUser
);
router.get(
    '/:chatroomId/users',
    Auth.isInChatroom,
    ChatroomController.getUsersInChatroom
);
router.get('/:chatroomId', Auth.isInChatroom, ChatroomController.getChatroom);
router.delete('/:chatroomId', Auth.isAdmin, ChatroomController.removeChatroom);

router.post('/', Auth.isAdmin, ChatroomController.createChatroom);

router.post(
    '/:chatroomId/user/:userId',
    Auth.isInChatroom,
    Auth.isFriend,
    ChatroomController.addUserIntoChatroom
);
router.delete(
    '/:chatroomId/user/:userId',
    Auth.isInChatroom,
    Auth.isFriend,
    ChatroomController.removeUserFromChatroom
);
module.exports = router;
