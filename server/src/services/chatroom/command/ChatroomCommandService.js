import ChatroomRepository from '../../../repositories/ChatroomRepository';
import UserInChatroomService from '../../UserInChatroomService';
import UserRepository from '../../../repositories/UserRepository';
import createHttpError from 'http-errors';
class ChatroomCommandService {
    async createChatroom(name) {
        return await ChatroomRepository.createChatroom(name);
    }
    async removeChatroom(chatroomId) {
        await this.getChatroomById(chatroomId);
        return await ChatroomRepository.removeChatroom(chatroomId);
    }
    async addUserIntoChatroom(userId, chatroomId) {
        await this.checkUserExists(userId);
        await this.getChatroomById(chatroomId);
        const isAlreadyMember =
            await UserInChatroomService.isExistUserInChatroom(
                userId,
                chatroomId
            );
        if (isAlreadyMember) {
            throw createHttpError.BadRequest(
                `User with ID ${userId} is already in chatroom ${chatroomId}.`
            );
        }
        return await UserInChatroomService.addUserIntoChatroomById(
            userId,
            chatroomId
        );
    }
    async removeUserFromChatroom(userId, chatroomId) {
        await this.checkUserExists(userId);
        await this.getChatroomById(chatroomId);
        await this.checkUserInChatroom(userId, chatroomId);
        return await UserInChatroomService.removeUserFromChatroom(
            userId,
            chatroomId
        );
    }
}
export default new ChatroomCommandService();
