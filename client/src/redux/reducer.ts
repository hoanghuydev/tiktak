import { Reducer } from '@reduxjs/toolkit';
import authSlice, { InitStateAuthType } from '../features/auth/authSlice';
import postSlice, { InitStatePostType } from '@/features/post/postSlice';
import tabSlice, { TabState } from '@/features/tab/tabSlice';
import userSlice, { InitStateUserType } from '@/features/user/userSlice';
import chatroomSlice from '@/features/chatroom/chatroomSlice';
import editVideoSlice from '@/features/editVideo/editVideoSlice';

import commentSlice, {
  InitStateCommentType,
} from '@/features/comment/commentSlice';
import socketSlice, {
  InitStateSocketType,
} from '@/features/socket/socketSlice';
import { InitStateChatroomType } from '@/features/chatroom/chatroomSlice';
import { InitStateEditVideoType } from '@/features/editVideo/editVideoSlice';

export interface RootReducerType {
  auth: Reducer<InitStateAuthType>;
  post: Reducer<InitStatePostType>;
  tab: Reducer<TabState>;
  user: Reducer<InitStateUserType>;
  comment: Reducer<InitStateCommentType>;
  socket: Reducer<InitStateSocketType>;
  chatroom: Reducer<InitStateChatroomType>;
  editVideo: Reducer<InitStateEditVideoType>;
}

export interface RootState {
  auth: InitStateAuthType;
  post: InitStatePostType;
  tab: TabState;
  user: InitStateUserType;
  comment: InitStateCommentType;
  socket: InitStateSocketType;
  chatroom: InitStateChatroomType;
  editVideo: InitStateEditVideoType;
}

const rootReducer: RootReducerType = {
  auth: authSlice,
  post: postSlice,
  tab: tabSlice,
  user: userSlice,
  comment: commentSlice,
  socket: socketSlice,
  chatroom: chatroomSlice,
  editVideo: editVideoSlice,
};

export default rootReducer;
