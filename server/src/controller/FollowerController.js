import { badRequest, internalServerError } from '../utils/handleResp';
import * as followerServices from '../services/follower';
import * as chatroomServices from '../services/chatroom';
import * as userInChatroomServices from '../services/userInChatroom';
class FollowController {
    async getListFollower(req, res) {
        try {
            const { userId } = req.params;
            const followings = await followerServices.getListFollower(
                userId,
                req.user?.id,
                req.query,
            );
            return res.status(200).json({ ...followings });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async getListFollowing(req, res) {
        try {
            const { userId } = req.params;
            const followings = await followerServices.getListFollowing(
                userId,
                req.user?.id,
                req.query
            );
            return res.status(200).json({ ...followings });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async followUser(req, res) {
        try {
            const { userId } = req.params;
            if (userId == req.user.id)
                return badRequest("Can't follow yourself", res);
            const follow = await followerServices.followUser(
                req.user.id,
                userId
            );
            if (!follow[1])
                return badRequest("You're already following this user", res);
            const isFriend = await followerServices.getFollower({
                follower: userId,
                followee: req.user.id,
            });
            if (isFriend) {
                // Create chatroom
                const newChatroom = await chatroomServices.createChatroom('');
                // Add member into chatroom
                await userInChatroomServices.addUserIntoChatroom(
                    req.user.id,
                    newChatroom.id
                );
                await userInChatroomServices.addUserIntoChatroom(
                    userId,
                    newChatroom.id
                );
            }
            return res.status(200).json({
                err: 0,
                mes: 'Followed',
                follow: follow[0],
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async unfollowUser(req, res) {
        try {
            const { userId } = req.params;
            if (userId == req.user.id)
                return badRequest('Cant unfollow yourself', res);
            const isFollow = await followerServices.getFollower({
                follower: req.user.id,
                followee: userId,
            });
            if (!isFollow)
                return badRequest("You're not following this user", res);
            const isFriend = await followerServices.getFollower({
                follower: userId,
                followee: req.user.id,
            });
            if (isFriend) {
                const chatroomId =
                    await userInChatroomServices.findChatroomIdWithMembers(
                        req.user.id,
                        userId
                    );
                // Remove user from chatroom
                await userInChatroomServices.removeUserFromChatroom(
                    req.user.id,
                    chatroomId
                );
                await userInChatroomServices.removeUserFromChatroom(
                    userId,
                    chatroomId
                );
                await chatroomServices.removeChatroom(chatroomId);
            }
            await followerServices.unfollowUser(req.user.id, userId);
            return res.status(200).json({
                err: 0,
                mes: 'Unfollowed',
            });
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new FollowController();
