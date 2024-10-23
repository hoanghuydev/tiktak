import { axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { ChatroomModel } from '@/models/chatroom';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/chatroom';
export interface ChatroomsPayload extends AbstractPayload {
  comments: ChatroomModel[];
  pagination: PaginationModel;
}
export interface CommentPayload extends AbstractPayload {
  comment: ChatroomModel;
}
const CommentService = {
  async getChatroomsByUserId(userId: number) {
    return new Promise<ChatroomsPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/user/${userId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default CommentService;
