import { axiosToken } from '@/axios';
import { AbstractModel } from '@/models';
import { FollowModel } from '@/models/follow';
import { UserModel } from '@/models/user';
import AbstractPayload from '@/utils/abtractPayloadType';

const routePath = '/follow/';
const FollowService = {
  async followUser(userId: number) {
    return new Promise<FollowModel>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.post(routePath + userId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async unfollowUser(userId: number) {
    return new Promise<AbstractModel>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.delete(routePath + userId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getListFollower(userId: number) {
    return new Promise<UserModel[]>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `followers/${userId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getListFollowing(userId: number) {
    return new Promise<UserModel[]>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `followings/${userId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getListFriend(userId: number) {
    return new Promise<UserModel[]>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `friends/${userId}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default FollowService;
