import { AbstractModel } from '.';
import { AvatarModel } from './avatar';
import { RoleModel } from './role';

export interface UserModel extends AbstractModel {
  fullName: string;
  userName: string;
  email: string;
  bio: string;
  password: string | null;
  association: string;
  isVertified: boolean;
  roleData: RoleModel;
  avatarData: Partial<AvatarModel>;
  followings: number;
  followers: number;
  friends: number;
  likes: number;
  isFollow: boolean | number;
  isFriend: boolean | number;
  isMe: boolean | number;
}
