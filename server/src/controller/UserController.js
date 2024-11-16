import * as userServices from '../services/user';
import {
    alreadyExistRow,
    badRequest,
    internalServerError,
    notFound,
} from '../utils/handleResp';
import UploadFile from '../utils/uploadFile';
import * as avatarServices from '../services/avatar';
class UserController {
    /**
     * Find users with pagination and sorting options.
     *
     * @param {Object} req - The request object.
     * @param {Object} req.query - The query parameters.
     * @param {number} req.query.page - The page number.
     * @param {number} req.query.pageSize - The number of items per page.
     * @param {string} req.query.orderBy - The field to order by.
     * @param {string} req.query.orderDirection - The direction to order (asc or desc).
     * @param {string} req.query.name - The name to filter by.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - The function returns a promise.
     */
    async findUser(req, res, next) {
        try {
            let users = await userServices.findUsers(req.query, req.user?.id);
            return res.status(200).json({
                err: 0,
                mes: '',
                ...users,
            });
        } catch (error) {
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            const user = await userServices.findOne({ id: req.user.id });
            if (!user) return notFound('User not found', res);
            user.password = '';
            return res.status(200).json({
                err: 0,
                mes: 'Found user',
                user,
            });
        } catch (error) {
            next(error);
        }
    }
    async getProfile(req, res, next) {
        try {
            const { username } = req.params;
            const user = await userServices.getProfile(username, req.user?.id);
            if (!user) return badRequest('Not found user', res);
            return res.status(200).json({
                err: 0,
                mes: 'Get profile successfull',
                user,
            });
        } catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            const user = await userServices.findOne({ id: req.params.userId });
            if (!user) return notFound('User not found', res);
            user.password = '';
            return res.status(200).json({
                err: 0,
                mes: 'Found user',
                user,
            });
        } catch (error) {
            next(error);
        }
    }
    async updatePeerId(req, res, next) {
        try {
            const { peerId } = req.body;
            const resp = await userServices.updateUser({ peerId }, req.user.id);
            if (resp)
                userServices.findOne({ id: userId }).then((userData) => {
                    return res.status(200).json({
                        err: 0,
                        mes: 'Updated peer id ' + userId,
                        user: userData,
                    });
                });
            else return badRequest('Cannot update peer id', res);
        } catch (error) {
            next(error);
        }
    }
    async updateAvatar(req, res, next) {
        try {
            if (!req.file) return badRequest('Please choose avatar', res);
            const avatarImage = req.file.buffer;
            const { userId } = req.params;

            const user = await userServices.findOne({
                id: userId,
            });
            const oldPublicId = user.avatarData.publicId;

            if (user.avatarData.code != process.env.CODE_DEFAULT_AVATAR) {
                await UploadFile.removeFromCloudinary(
                    process.env.IMAGE_TYPE_FILE,
                    oldPublicId
                );
            }
            const avatarUploaded = await UploadFile.uploadToCloudinary(
                avatarImage,
                process.env.IMAGE_TYPE_FILE,
                process.env.CLOUDINARY_FOLDER_AVATAR
            );
            const avatarModel = {
                publicId: avatarUploaded.id,
                url: avatarUploaded.url,
                code: 'avatarOfUser' + userId,
            };
            await avatarServices
                .updateAvatar(oldPublicId, userId, avatarModel)
                .then((resp) => {
                    if (resp) {
                        userServices
                            .findOne({ id: userId })
                            .then((userData) => {
                                return res.status(200).json({
                                    err: 0,
                                    mes: 'Uploaded avatar of user ' + userId,
                                    user: userData,
                                });
                            });
                    } else return badRequest('Something error occurred');
                });
        } catch (error) {
            next(error);
        }
    }
    async removeAvatar(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await userServices.findOne({ id: userId });
            const publicId = user.avatarData.publicId;
            if (publicId == process.env.PUBLIC_ID_DEFAULT_AVATAR)
                return badRequest('Not have avatar to remove', res);
            const removeAvatar = await avatarServices.removeAvatar(
                userId,
                publicId
            );

            if (removeAvatar) {
                await UploadFile.removeFromCloudinary(
                    process.env.IMAGE_TYPE_FILE,
                    publicId
                );
                return res.status(200).json({
                    err: 0,
                    mes: 'Removed avatar',
                });
            } else return badRequest('Remove avatar failed', res);
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { userName, fullName, bio } = req.body;
            if (!userName && !fullName && !bio)
                return badRequest('Missing payload', res);
            const updateData = {};
            const { userId } = req.params;
            if (userName) {
                const existUser = await userServices.findOne({ userName });
                if (existUser)
                    return alreadyExistRow('Username already exists', res);
                updateData.userName = userName;
            }
            if (fullName) updateData.fullName = fullName;
            if (bio) updateData.bio = bio;

            const user = await userServices.updateUser(updateData, userId);
            if (user)
                return res.status(200).json({
                    err: 0,
                    mes: 'Updated user',
                });
            else return badRequest('Not found user', res);
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();
