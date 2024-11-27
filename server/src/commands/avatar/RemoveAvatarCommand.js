import db from '@models';
import AvatarRepository from '@repositories/AvatarRepository';
import UserRepository from '@repositories/UserRepository';
import createError from 'http-errors';
import UploadFile from '@utils/uploadFile';
import FindUserQuery from '../../queries/user/FindUserQuery';
class RemoveAvatarCommand {
    async execute(userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await FindUserQuery.execute({ id: userId });
            const { publicId } = user.avatarData || '';
            if (publicId === process.env.PUBLIC_ID_DEFAULT_AVATAR) {
                throw createError.BadRequest(
                    'User does not have a custom avatar to remove'
                );
            }
            // Cập nhật avatar của user về mặc định
            const updatedUser = await userServices.updateUser(
                { avatarPublicId: process.env.PUBLIC_ID_DEFAULT_AVATAR },
                userId,
                transaction
            );
            if (!updatedUser)
                throw createError.InternalServerError(
                    'Failed to update user avatar'
                );
            await AvatarRepository.removeAvatar(publicId, transaction);
            await UploadFile.removeFromCloudinary(
                process.env.IMAGE_TYPE_FILE,
                publicId
            );
            await transaction.commit();
            return {
                mes: 'Avatar removed successfully',
                user: updatedUser,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
export default new RemoveAvatarCommand();
