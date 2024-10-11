import { clientURL } from '@/axios';
import FollowService from '@/features/follow/followService';
import PostService from '@/features/post/postService';
import { message } from 'antd';

/**
 * Handles the like action for a post.
 * @param postId The ID of the post to like.
 * @param isLiked The current like status.
 * @param setLikes The state setter function for the number of likes.
 * @param setIsLiked The state setter function for the like status.
 */
const likePost = async (
  postId: number,
  currentLikeState: boolean,
  setLikes: any,
  setIsLiked: any
) => {
  if (!currentLikeState) {
    await PostService.likePost(postId)
      .then(() => {
        setLikes((prevLikes: any) => prevLikes + 1);
        setIsLiked(true);
      })
      .catch((err) => {
        message.error(err.response.data.mes);
      });
  } else {
    await PostService.unlikePost(postId)
      .then(() => {
        setIsLiked(false);
        setLikes((prevLikes: number) => prevLikes - 1);
      })
      .catch((err) => {
        message.error(err.response.data.mes);
      });
  }
};

/**
 * Handles the share action for a post.
 * @param postId The ID of the post to share.
 * @param setShares The state setter function for the number of shares.
 */
const sharePost = async (postId: number, setShares: any) => {
  navigator.clipboard
    .writeText(`${clientURL}post/${postId}`)
    .then(async () => {
      try {
        const resp = await PostService.sharePost(postId);
        setShares((prevShares: number) => prevShares + 1);
        message.success('Copied link to clipboard');
      } catch (error) {
        message.success('Copied link to clipboard');
      }
    })
    .catch(() => {
      message.error("Can't share video");
    });
};
const followAndUnfollowUser: (
  userId: number,
  isCurrentFollowing: boolean,
  callback: () => any
) => void = async (userId, isCurrentFollowing, callback) => {
  if (!isCurrentFollowing) {
    await FollowService.followUser(userId).then(callback);
  } else {
    await FollowService.unfollowUser(userId).then(callback);
  }
};
export const SocialActionUtil = {
  likePost,
  sharePost,
  followAndUnfollowUser,
};
