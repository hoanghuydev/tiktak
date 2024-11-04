import { axiosToken } from '@/axios';
import { PaginationModel } from '@/models';
import { MessageModel } from '@/models/message';
import AbstractPayload from '@/utils/abtractPayloadType';
import { Message } from 'yup';
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
  async sendMessage(chatroomId: number, message: MessageModel) {
    return new Promise<MessagesPayload>(async (resolve, reject) => {
      try {
        const { content, type } = message;
        const resp = await axiosToken.post(
          routePath + `/chatroom/${chatroomId}`,
          { content, type }
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteMessageById(messageId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.delete(
          routePath + `/${messageId}/delete`
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  recallMessage(messageId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.delete(
          routePath + `/${messageId}/recall`
        );
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteAllMessageUpToNow(chatroomId: number) {
    return new Promise<AbstractPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.delete(
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
