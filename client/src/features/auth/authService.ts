import { axiosNoToken } from '@/axios';
import { UserModel } from '@/models/user';
const routePath = '/auth';
export interface LoginParams {
  emailOrUsername: string;
  password: string;
}
export interface RegisterParams {
  email: string;
  password: string;
  userName: string;
}
export interface VertifyParams {
  email: string;
  otp: string;
}
export interface AuthPayload {
  err: number;
  mes: string;
  accessToken: string;
  user: UserModel;
}
const AuthService = {
  async login({ emailOrUsername, password }: LoginParams) {
    return new Promise<AuthPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosNoToken.post(routePath + '/login', {
          emailOrUsername,
          password,
        });
        if (resp.data && resp.data.accessToken) {
          localStorage.setItem('accessToken', resp.data.accessToken);
        }
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },

  async register({ email, password, userName }: RegisterParams) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axiosNoToken.post(routePath + '/register', {
          email,
          password,
          userName,
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },

  async verifyAccount({ email, otp }: VertifyParams) {
    return new Promise(async (resolve, reject) => {
      try {
        const resp = await axiosNoToken.post(routePath + '/verify-email', {
          email,
          otp,
        });
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  async loginSuccess() {
    return new Promise<AuthPayload>(async (resolve, reject) => {
      try {
        const resp = await axiosNoToken.get(routePath + '/login/success');
        resolve(resp.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default AuthService;
