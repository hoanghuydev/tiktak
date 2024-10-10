import { AbstractModel } from '.';
import { UserModel } from './user';

export interface FollowModel extends AbstractModel {
  follower: number;
  followerData: UserModel;
  followee: number;
  followeeData: UserModel;
  isFollow: number | boolean;
  isFriend: number | boolean;
  isFollowee: number | boolean;
}
