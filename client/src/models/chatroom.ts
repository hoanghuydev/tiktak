import { AbstractModel } from '.';
import { UserModel } from './user';

export interface ChatroomModel extends AbstractModel {
  name: string;
}
