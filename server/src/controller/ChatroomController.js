import {
    badRequest,
    forBidden,
    internalServerError,
} from '../utils/handleResp';
import * as chatroomServices from '../services/chatroom';
import * as followerServices from '../services/follower';
import * as userInChatroomServices from '../services/userInChatroom';
import { chat } from 'googleapis/build/src/apis/chat';
class ChatroomController {
    async getUsersInChatroom(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const users = await chatroomServices.getUsersInChatroom(
                chatroomId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...users,
            });
        } catch (error) {
            next(error);
        }
    }
    async getChatroomsOfUser(req, res, next) {
        try {
            const { userId } = req.params;
            const chatrooms = await chatroomServices.getChatroomsOfUser(
                userId,
                req.query
            );
            return res.status(200).json({
                err: 0,
                mes: '',
                ...chatrooms,
            });
        } catch (error) {
            next(error);
        }
    }
    async getChatroom(req, res, next) {
        try {
            const chatroom = await chatroomServices.getChatroom({
                id: req.params.chatroomId,
            });
            if (chatroom)
                return res.status(200).json({
                    err: 0,
                    mes: '',
                    chatroom,
                });
            else return badRequest('Not found chatroom', res);
        } catch (error) {
            next(error);
        }
    }
    async addUserIntoChatroom(req, res, next) {
        try {
            const { userId, chatroomId } = req.params;
            await userInChatroomServices.addUserIntoChatroom(
                userId,
                chatroomId
            );
            return res.status(200).json({
                err: 0,
                mes: 'Added use into chatroom',
            });
        } catch (error) {
            next(error);
        }
    }
    async removeUserFromChatroom(req, res, next) {
        try {
            const { userId, chatroomId } = req.params;

            await userInChatroomServices.removeUserFromChatroom(
                userId,
                chatroomId
            );
            return res.status(200).json({
                err: 0,
                mes: 'Removed user from chatroom',
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new ChatroomController();
