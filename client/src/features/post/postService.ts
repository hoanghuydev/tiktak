import { axiosNoToken, axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { PostModel } from '@/models/post';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/post';

export interface PostsPayload extends AbstractPayload {
  posts: PostModel[];
  pagination: PaginationModel;
}
export interface PostPayload extends AbstractPayload {
  post: PostModel;
}
const PostService = {
  async getPosts(title?: string) {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(
          routePath + `/${title ? `?title=${title}` : ''}`
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async watchPost(postId?: number) {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosNoToken.post(routePath + `/${postId}/watch`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getPostsByUserId(userId: number) {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/user/${userId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getFollowingPosts() {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + '/following');
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getFriendPosts() {
    return new Promise<PostsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + '/friends');
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getPostById(postId: number) {
    return new Promise<PostPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/${postId}`);
        const data = resp.data;
        const transformedPost = {
          ...data.post,
          isMe: Boolean(data.post.isMe),
          isFollow: Boolean(data.post.isFollow),
          isFriend: Boolean(data.post.isFriend),
          isLiked: Boolean(data.post.isLiked),
        };

        resolve({ ...data, post: transformedPost });
      } catch (error) {
        reject(error);
      }
    });
  },

  async sharePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + '/share/' + postId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async likePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + '/like/' + postId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async unlikePost(postId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + '/unlike/' + postId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async uploadPost(postFormData: FormData) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(
          routePath + '/upload/',
          postFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default PostService;
