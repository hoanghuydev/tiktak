// src/redux/reducer.ts
import { Reducer } from '@reduxjs/toolkit';
import authSlice, { InitStateAuthType } from '../features/auth/authSlice';
import postSlice, { InitStatePostType } from '@/features/post/postSlice';
import tabSlice, { TabState } from '@/features/tab/tabSlice';

export interface RootReducerType {
  auth: Reducer<InitStateAuthType>;
  post: Reducer<InitStatePostType>;
  tab: Reducer<TabState>;
}

export interface RootState {
  auth: InitStateAuthType;
  post: InitStatePostType;
  tab: TabState;
}

const rootReducer: RootReducerType = {
  auth: authSlice,
  post: postSlice,
  tab: tabSlice,
};

export default rootReducer;
