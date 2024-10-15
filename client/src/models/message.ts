import { AbstractModel } from '.';
import { AvatarModel } from './avatar';
import { UserModel } from './user';

export interface MessageModel extends AbstractModel {
  sender: number;
  chatroomId: number;
  content: string;
  senderData: UserModel;
}
