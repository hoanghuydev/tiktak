import UserRepository from '../repositories/UserRepository';
import createError from 'http-errors';
class UserService {
    async findUsersByName(query, viewerId) {
        const resp = await UserRepository.findUsersByName(query, viewerId);
        return {
            mes: 'Users found successfully',
            ...resp,
        };
    }
    async findById(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) throw createError.BadRequest('Not found user');
        return {
            mes: "Founded user with id '" + userId,
            user,
        };
    }
    async getProfileByUsername(username, viewerId) {
        const user = await UserRepository.getProfileByUsername(
            username,
            viewerId
        );
        if (!user) throw createError.BadRequest('Not found user');
        return {
            mes: 'Success',
            user,
        };
    }
    async updateUserInfo(data, userId) {
        const { userName, fullName, bio } = data;
        const newUserData = {};
        if (userName) {
            const isExist = await UserRepository.existByEmailOrUsername({
                userName,
            });
            if (isExist) throw createError.Conflict('Username already exists');
            newUserData.userName = userName;
        }
        if (fullName) newUserData.fullName = fullName;
        if (bio) newUserData.bio = bio;
        const user = await UserRepository.updateUser(newUserData, {
            id: userId,
        });
        if (!user[0]) throw createError.BadRequest('User not found');
        return {
            mes: 'Updated user info',
            user,
        };
    }
    async updatePeerId(peerId, userId) {
        const user = await UserRepository.updateUser(
            { peerId },
            { id: userId }
        );
        if (!user) throw createError.BadRequest('Not found user');
        return {
            mes: 'Updated peer id successfully',
            user,
        };
    }
    async removeUser(userId) {
        const user = await UserRepository.remove(userId);
        if (!user) throw createError.BadRequest('Not found user');
        return {
            mes: 'Removed user successfully',
            user,
        };
    }
}
export default new UserService();
