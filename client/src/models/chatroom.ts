import { AbstractModel } from '.';
import { UserModel } from './user';

export interface ChatroomModel extends AbstractModel {
  name: string;
  members: [{ member: number; memberData: UserModel }];
  lastMessage: string;
}
