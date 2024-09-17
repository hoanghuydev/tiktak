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
  avatarData: AvatarModel;
  followings: number;
  followers: number;
  likes: number;
  isFollow: boolean;
  isFriend: boolean;
  isMe: boolean;
}
