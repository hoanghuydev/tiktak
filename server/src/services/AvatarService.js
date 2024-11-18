import db from '../models';
import AvatarRepository from '../repositories/AvatarRepository';
import UserRepository from '../repositories/UserRepository';
import uploadFile from '../utils/uploadFile';
import createError from 'http-errors';

class AvatarService {
    async updateAvatar(avatarImage, userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await UserRepository.findById(userId);
            if (!user) throw createError.NotFound('User not found');
            const { avatarData } = user;
            const { publicId, code } = avatarData || {};
            const isDefaultAvatar = code === process.env.CODE_DEFAULT_AVATAR;
            // Xóa avatar cũ trên Cloudinary nếu không phải avatar mặc định
            if (!isDefaultAvatar) {
                await uploadFile.removeFromCloudinary(
                    process.env.IMAGE_TYPE_FILE,
                    publicId
                );
            }
            // Tải lên avatar mới
            const avatarUploaded = await uploadFile.uploadToCloudinary(
                avatarImage,
                process.env.IMAGE_TYPE_FILE,
                process.env.CLOUDINARY_FOLDER_AVATAR
            );
            const newAvatarData = {
                publicId: avatarUploaded.id,
                url: avatarUploaded.url,
                code: `avatarOfUser${userId}`,
            };
            // Cập nhật avatar: tạo mới hoặc cập nhật avatar cũ
            const updateAvatarPromise = isDefaultAvatar
                ? AvatarRepository.createAvatar(newAvatarData, { transaction })
                : AvatarRepository.updateAvatar(
                      newAvatarData,
                      { publicId },
                      { transaction }
                  );
            // Cập nhật thông tin avatar trên User
            const userUpdatePromise = UserRepository.updateUser(
                { avatarPublicId: avatarUploaded.id },
                { id: userId },
                { transaction }
            );
            await Promise.all([updateAvatarPromise, userUpdatePromise]);
            await transaction.commit();
            return {
                mes: 'Uploaded new avatar successfully',
                user: { ...user, avatarData: newAvatarData },
            };
        } catch (error) {
            await transaction.rollback();
            throw createError.InternalServerError();
        }
    }
    async removeAvatar(userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await UserRepository.findOne({ id: userId });
            if (!user) throw createError.NotFound('User not found');
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
export default new AvatarService();
