import ChatroomRepository from '../repositories/ChatroomRepository';
import UserInChatroomService from './UserInChatroomService';
import UserRepository from '../repositories/UserRepository';
import createHttpError from 'http-errors';

class ChatroomService {
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
    async createChatroom(name) {
        return await ChatroomRepository.createChatroom(name);
    }
    async removeChatroom(chatroomId) {
        await this.getChatroomById(chatroomId);
        return await ChatroomRepository.removeChatroom(chatroomId);
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
export default new ChatroomService();
