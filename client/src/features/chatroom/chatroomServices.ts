import { axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { ChatroomModel } from '@/models/chatroom';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/chatroom';
export interface ChatroomsPayload extends AbstractPayload {
  chatrooms: ChatroomModel[];
  pagination: PaginationModel;
}
export interface ChatroomPayload extends AbstractPayload {
  chatroom: ChatroomModel;
}
const ChatroomService = {
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
export default ChatroomService;
