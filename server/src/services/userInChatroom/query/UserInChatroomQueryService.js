import UserInChatroomRepository from '../../../repositories/UserInChatroomRepository';

class UserInChatroomQueryService {
    async isExistUserInChatroom(userId, chatroomId) {
        return await UserInChatroomRepository.findOne({
            where: {
                member: userId,
                chatroomId,
            },
        });
    }
}
export default new UserInChatroomQueryService();
