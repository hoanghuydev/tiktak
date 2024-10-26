import { axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { MessageModel } from '@/models/message';
import AbstractPayload from '@/utils/abtractPayloadType';
const routePath = '/message';
export interface MessagesPayload extends AbstractPayload {
  messages: MessageModel[];
  pagination: PaginationModel;
}
export interface MessagePayload extends AbstractPayload {
  message: MessageModel;
}
const MessageService = {
  async getMessagesByChatroomId(chatroomId: number) {
    return new Promise<MessagesPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(
          routePath + `/chatroom/${chatroomId}`
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default MessageService;
