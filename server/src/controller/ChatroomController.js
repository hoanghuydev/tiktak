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
    async getUsersInChatroom(req, res) {
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
            console.log(error);
            return internalServerError(res);
        }
    }
    async getChatroomsOfUser(req, res) {
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
            console.log(error);
            return internalServerError(res);
        }
    }
    async getChatroom(req, res) {
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
            return internalServerError(res);
        }
    }
    async addUserIntoChatroom(req, res) {
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
            return internalServerError(res);
        }
    }
    async removeUserFromChatroom(req, res) {
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
            return internalServerError(res);
        }
    }
}
export default new ChatroomController();
