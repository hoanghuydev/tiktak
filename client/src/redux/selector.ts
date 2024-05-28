import { UserModel } from '@/models/user';
import { InitStateAuthType } from '../features/auth/authSlice';
import { RootState } from './reducer';
import { InitStatePostType } from '@/features/post/postSlice';
import { PostModel } from '@/models/post';
import { PostUploadModel } from '@/models/postUpload';

export const authSelector = (state: RootState): InitStateAuthType => state.auth;
export const currentUserSelector = (state: RootState): UserModel | null =>
  state.auth.user;
export const getPostsSelector = (state: RootState): PostModel[] =>
  state.post.posts;
export const postSelector = (state: RootState): InitStatePostType | null =>
  state.post;
export const postUploadSelector = (state: RootState): PostUploadModel | null =>
  state.post.postUpload;
export const pecentLoadingPostSelector = (state: RootState): number =>
  state.post.pecentLoading;
