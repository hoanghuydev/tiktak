import { AbstractModel } from '.';
import { MessageModel } from './message';
import { UserModel } from './user';

export interface ChatroomModel extends AbstractModel {
  name: string;
  members: [{ member: number; memberData: UserModel }];
  lastMessage: string;
  messages: MessageModel[];
}
