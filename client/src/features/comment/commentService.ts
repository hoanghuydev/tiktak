import { axiosToken } from '@/axios';
import { CommentModel } from '@/models/comment';
import { ReplyCommentModel } from '@/models/replyComment';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/comment';
export interface CommentsPayload extends AbstractPayload {
  comments: CommentModel[];
}
export interface RepliesCommentPayload extends AbstractPayload {
  comments: ReplyCommentModel[];
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
  async getRepliesCommentByCommentId(commentId: number) {
    return new Promise<RepliesCommentPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/${commentId}/reply`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default CommentService;
