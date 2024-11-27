import db from '@models';
import UserRepository from '@repositories/UserRepository';
import UploadFile from '@utils/uploadFile';
import AvatarRepository from '@repositories/AvatarRepository';
import createError from 'http-errors';
import FindUserQuery from '../../queries/user/FindUserQuery';
class UpdateAvatarCommand {
    async execute(avatarImage, userId) {
        const transaction = await db.sequelize.transaction();
        try {
            const user = await FindUserQuery.execute({ id: userId });
            const { avatarData } = user;
            const { publicId, code } = avatarData || {};
            const isDefaultAvatar = code === process.env.CODE_DEFAULT_AVATAR;
            // Xóa avatar cũ trên Cloudinary nếu không phải avatar mặc định
            if (!isDefaultAvatar) {
                await UploadFile.removeFromCloudinary(
                    process.env.IMAGE_TYPE_FILE,
                    publicId
                );
            }
            // Tải lên avatar mới
            const avatarUploaded = await UploadFile.uploadToCloudinary(
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
                user: { ...user, avatarData: newAvatarData },
            };
        } catch (error) {
            await transaction.rollback();
            throw createError.InternalServerError();
        }
    }
}
export default new UpdateAvatarCommand();
