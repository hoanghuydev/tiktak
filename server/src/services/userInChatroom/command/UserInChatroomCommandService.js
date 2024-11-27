import UserInChatroomRepository from '@repositories/UserInChatroomRepository';

class UserInChatroomCommandService {
    async removeUserFromChatroom(userId, chatroomId) {
        return await UserInChatroomRepository.removeUserFromChatroom(
            userId,
            chatroomId
        );
    }
    async addUserIntoChatroomById(userId, chatroomId) {
        return await UserInChatroomRepository.addUserIntoChatroomById(
            userId,
            chatroomId
        );
    }
}
export default new UserInChatroomCommandService();
