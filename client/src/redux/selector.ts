import { UserModel } from '@/models/user';
import { InitStateAuthType } from '../features/auth/authSlice';
import { RootState } from './reducer';
import { InitStatePostType } from '@/features/post/postSlice';
import { PostModel } from '@/models/post';
import { PostUploadModel } from '@/models/postUpload';
import { TabState, TabType } from '@/features/tab/tabSlice';
import { CommentModel } from '@/models/comment';

export const authSelector = (state: RootState): InitStateAuthType => state.auth;
export const tabSelector = (state: RootState): TabType => state.tab.tab;
export const currentUserSelector = (state: RootState): UserModel | null =>
  state.auth.user;
export const getPostsSelector = (state: RootState): PostModel[] =>
  state.post.posts;
export const getPostSelector = (state: RootState): PostModel =>
  state.post.post!;
export const postSliceSelector = (state: RootState): InitStatePostType | null =>
  state.post;
export const postUploadSelector = (state: RootState): PostUploadModel | null =>
  state.post.postUpload;
export const percentLoadingPostSelector = (state: RootState): number =>
  state.post.percentLoading;
export const getPostLoadingSelector = (state: RootState): boolean =>
  state.post.isLoading;
export const getUsersSelector = (state: RootState): UserModel[] =>
  state.user.users;
export const getCommentsSelector = (state: RootState): CommentModel[] =>
  state.comment.comments;
