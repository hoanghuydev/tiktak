import UserInChatroomRepository from '../repositories/UserInChatroomRepository';

class UserInChatroomService {
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
    async isExistUserInChatroom(userId, chatroomId) {
        return await db.UserInChatroom.findOne({
            where: {
                member: userId,
                chatroomId,
            },
        });
    }
}
export default new UserInChatroomService();
