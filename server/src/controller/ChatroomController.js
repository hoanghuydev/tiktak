import {
    badRequest,
    forBidden,
    internalServerError,
} from '../utils/handleResp';
import * as chatroomServices from '../services/chatroom';
import * as followerServices from '../services/follower';
import * as userInChatroomServices from '../services/userInChatroom';
import { chat } from 'googleapis/build/src/apis/chat';
import ChatroomService from '../services/ChatroomService';
import { validateSchema } from '../utils/validateUtil';
import { createChatroomSchema } from '../validators/chatroomValidator';
class ChatroomController {
    async getUsersInChatroom(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const resp = await ChatroomService.getUsersInChatroom(
                req.query,
                chatroomId
            );
            return res.status(200).json({
                err: 0,
                mes: 'Successfully retrieved users',
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async getChatroomsOfUser(req, res, next) {
        try {
            const { userId } = req.params;
            const resp = await ChatroomService.getChatroomsByUserId(
                req.query,
                userId
            );
            return res.status(200).json({
                err: 0,
                mes: 'Get chatrooms successfully',
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async getChatroom(req, res, next) {
        try {
            const { chatroomId } = req.params;
            const resp = await ChatroomService.getChatroomById(chatroomId);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async createChatroom(req, res, next) {
        try {
            await validateSchema(createChatroomSchema, req.body);
            const resp = await ChatroomService.createChatroom(req.body.name);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async addUserIntoChatroom(req, res, next) {
        try {
            const { userId, chatroomId } = req.params;

            await ChatroomService.addUserIntoChatroom(userId, chatroomId);
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
            await ChatroomService.removeUserFromChatroom(userId, chatroomId);
            return res.status(200).json({
                err: 0,
                mes: 'Removed user from chatroom',
            });
        } catch (error) {
            next(error);
        }
    }
    async removeChatroom(req, res, next) {
        try {
            const { chatroomId } = req.params;
            await ChatroomService.removeChatroom(chatroomId);
            return res.status(200).json({
                err: 0,
                mes: 'Removed chatroom',
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new ChatroomController();
