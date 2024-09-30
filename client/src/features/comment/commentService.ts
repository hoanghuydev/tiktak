import { axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { CommentModel } from '@/models/comment';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/comment';
export interface CommentsPayload extends AbstractPayload {
  comments: CommentModel[];
  pagination: PaginationModel;
}
export interface CommentPayload extends AbstractPayload {
  comment: CommentModel;
}
const CommentService = {
  async getCommentsByPostId(postId: number) {
    return new Promise<CommentsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/post/${postId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async commentPost(postId: number, content: string) {
    return new Promise<CommentPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + `/post/${postId}`, {
          content,
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async replyComment(commentId: number, content: string) {
    return new Promise<CommentPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + `/${commentId}/reply`, {
          content,
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getRepliesCommentByCommentId(commentId: number) {
    return new Promise<CommentsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/${commentId}/reply`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },

  async likeAndUnlikeCommentPost(commentId: number, like: boolean) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        let resp = null;
        if (like)
          // like comment post
          resp = await axiosToken.post(routePath + `/${commentId}/like`);
        // unlike comment post
        else resp = await axiosToken.post(routePath + `/${commentId}/unlike`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default CommentService;
