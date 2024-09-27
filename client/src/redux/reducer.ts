// src/redux/reducer.ts
import { Reducer } from '@reduxjs/toolkit';
import authSlice, { InitStateAuthType } from '../features/auth/authSlice';
import postSlice, { InitStatePostType } from '@/features/post/postSlice';
import tabSlice, { TabState } from '@/features/tab/tabSlice';
import userSlice, { InitStateUserType } from '@/features/user/userSlice';
import commentSlice, {
  InitStateCommentType,
} from '@/features/comment/commentSlice';

export interface RootReducerType {
  auth: Reducer<InitStateAuthType>;
  post: Reducer<InitStatePostType>;
  tab: Reducer<TabState>;
  user: Reducer<InitStateUserType>;
  comment: Reducer<InitStateCommentType>;
}

export interface RootState {
  auth: InitStateAuthType;
  post: InitStatePostType;
  tab: TabState;
  user: InitStateUserType;
  comment: InitStateCommentType;
}

const rootReducer: RootReducerType = {
  auth: authSlice,
  post: postSlice,
  tab: tabSlice,
  user: userSlice,
  comment: commentSlice,
};

export default rootReducer;
