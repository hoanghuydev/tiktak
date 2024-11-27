import ChatroomRepository from '../../../repositories/ChatroomRepository';
import UserInChatroomService from '../../UserInChatroomService';
import UserRepository from '../../../repositories/UserRepository';
import createHttpError from 'http-errors';
class ChatroomQueryService {
    async checkUserExists(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            throw createHttpError.BadRequest(
                `User with ID ${userId} does not exist.`
            );
        }
        return user;
    }
    async checkUserInChatroom(userId, chatroomId) {
        const isMember = await UserInChatroomService.isExistUserInChatroom(
            userId,
            chatroomId
        );
        if (!isMember) {
            throw createHttpError.Unauthorized(
                `User with ID ${userId} is not a member of chatroom ${chatroomId}.`
            );
        }
        return true;
    }
    async getUsersInChatroom(query, chatroomId) {
        await this.getChatroomById(chatroomId);
        return await ChatroomRepository.getUsersInChatroom(query, chatroomId);
    }
    async getChatroomsByUserId(query, userId) {
        await this.checkUserExists(userId);
        return await ChatroomRepository.getChatroomsByUserId(query, userId);
    }
    async getChatroomById(chatroomId) {
        const chatroom = await ChatroomRepository.getChatroomById(chatroomId);
        if (!chatroom) {
            throw createHttpError.BadRequest(
                `Chatroom with ID ${chatroomId} does not exist.`
            );
        }
        return chatroom;
    }
}
export default new ChatroomQueryService();
