import AvatarService from '../services/AvatarService';
import { validateSchema } from '../utils/validateUtil';
import { avatarSchema } from '../validators/avatarValidator';
import {
    getUserByIdvalidator,
    updatePeerIdValidator,
    updateUserValidator,
} from '../validators/userValidator';
import UserService from '../services/UserService';
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
            const resp = await UserService.findUsersByName(
                req.query,
                req.user?.id
            );
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async me(req, res, next) {
        try {
            const resp = await UserService.findById(req.user.id);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async getProfile(req, res, next) {
        try {
            const { username } = req.params;
            const resp = await UserService.getProfileByUsername(
                username,
                req.user?.id
            );
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            await validateSchema(getUserByIdvalidator, req.params);
            const resp = await UserService.findById({ id: req.params.userId });
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async updatePeerId(req, res, next) {
        try {
            await validateSchema(updatePeerIdValidator, req.body);
            const { peerId } = req.body;
            const resp = await UserService.updatePeerId(peerId, req.user.id);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async updateAvatar(req, res, next) {
        try {
            const avatarImage = req.file?.buffer;
            const { userId } = req.params;
            await validateSchema(avatarSchema, { avatarImage, userId });
            const resp = await AvatarService.updateAvatar(avatarImage, userId);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async removeAvatar(req, res, next) {
        try {
            const { userId } = req.params;
            const resp = await AvatarService.removeAvatar(userId);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            await validateSchema(updateUserValidator, req.body);
            const resp = await UserService.updateUserInfo(req.body, userId);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
    async removeUser(req, res, next) {
        try {
            const { userId } = req.params;
            const resp = await UserService.removeUser(userId);
            return res.status(200).json({
                err: 0,
                ...resp,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new UserController();
