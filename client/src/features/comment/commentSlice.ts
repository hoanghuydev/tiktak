import { PostModel } from '@/models/post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CommnentService from './commentService';
import { PaginationModel } from '@/models';
import { message } from 'antd';
import { PostUploadModel } from '@/models/postUpload';
import AbstractPayload from '@/utils/abtractPayloadType';
import { CommentModel } from '@/models/comment';

// Async Thunks
export const getCommentsByPostId = createAsyncThunk(
  'post/getCommentsByPostId',
  async (postId: number, thunkAPI) => {
    try {
      const resp = await CommnentService.getCommentsByPostId(postId);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Interfaces
export interface CommentPayload {
  err: number;
  mes: string;
  post: CommentModel;
}

export interface CommentsPayload extends PaginationModel {
  err: number;
  mes: string;
  comments: CommentModel[];
}

// export interface InitStatePostType {
//   posts: PostModel[];
//   post: PostModel | null;
//   postUpload: PostUploadModel;
//   isError: boolean;
//   isLoading: boolean;
//   pecentLoading: number;
//   isSuccess: boolean;
//   message: string;
// }

// // Initial state
// const initialState: InitStatePostType = {
//   posts: [],
//   post: null,
//   postUpload: {
//     video: null,
//     thumnail: null,
//     title: '',
//     visibility: 1,
//   },
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   pecentLoading: 99,
//   message: '',
// };

// // Utility functions
// const handlePending = (state: InitStatePostType) => {
//   state.isLoading = true;
// };

// const handleFulfilled = (state: InitStatePostType, action: any) => {
//   state.isError = false;
//   const payload = action.payload as CommentsPayload;
//   state.posts = payload.posts;
//   state.isLoading = false;
//   state.isSuccess = true;
// };

// const handleRejected = (state: InitStatePostType, action: any) => {
//   state.isLoading = false;
//   state.isError = true;
//   state.isSuccess = false;
//   const payload = action.payload as PostsPayload;
//   if (payload) {
//     state.message = payload.mes;
//     state.posts = [];
//     message.error(payload.mes);
//   }
// };

// Slice
// const postSlice = createSlice({
//   name: 'post',
//   initialState,
//   reducers: {},
// extraReducers: (builder) =>
//   builder
//     .addCase(getCommentsByPostId.pending, handlePending)
//     .addCase(getCommentsByPostId.fulfilled, handleFulfilled)
//     .addCase(getCommentsByPostId.rejected, handleRejected),
// });

// export const {} = postSlice.actions;
// export default postSlice.reducer;
