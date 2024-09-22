import { axiosToken } from '@/axios';
import { CommentModel } from '@/models/comment';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/comment';
export interface CommentsPayload extends AbstractPayload {
  comments: CommentModel[];
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
};
export default CommentService;
