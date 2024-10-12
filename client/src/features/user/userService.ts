import { axiosToken } from '@/axios';
import { UserModel } from '@/models/user';
import AbstractPayload from '@/utils/abtractPayloadType';
import { UsersPayload } from './userSlice';

export interface GetUserParams {
  userId: number;
}
export interface UserPayload extends AbstractPayload {
  user: UserModel;
}
const routePath = '/user';
const UserService = {
  async me() {
    return new Promise<UserPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + '/me');
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getUser(userId: GetUserParams) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + userId);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async getProfile(username: string) {
    return new Promise<UserPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/profile/${username}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async searchUsersByFullName(name: string) {
    return new Promise<UsersPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.get(routePath + `/find?name=${name}`);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateFullNameAndUserName(
    userId: number,
    updateInfo: { userName?: string; fullName?: string; bio?: string }
  ) {
    return new Promise<UserPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosToken.put(routePath + '/' + userId, updateInfo);
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async updateAvatar(userId: number, avatarFile: File) {
    return new Promise<UserPayload>(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const resp = await axiosToken.post(`/user/avatar/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};
export default UserService;
