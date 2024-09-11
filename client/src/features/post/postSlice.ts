import { PostModel } from '@/models/post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostService from './postService';
import { PaginationModel } from '@/models';
import { message } from 'antd';
import { PostUploadModel } from '@/models/postUpload';
import AbstractPayload from '@/utils/abtractPayloadType';
export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (postId, thunkAPI) => {
    try {
      const resp = await PostService.getPosts();
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const uploadPost = createAsyncThunk(
  'post/uploadPost',
  async (postFormData: FormData, thunkAPI) => {
    try {
      const resp = await PostService.uploadPost(postFormData);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export interface PostPayload {
  err: number;
  mes: string;
  post: PostModel;
}
export interface PostsPayload extends PaginationModel {
  err: number;
  mes: string;
  posts: PostModel[];
}
export interface InitStatePostType {
  posts: PostModel[];
  post: PostModel | null;
  postUpload: PostUploadModel;
  isError: boolean;
  isLoading: boolean;
  pecentLoading: number;
  isSuccess: boolean;
  message: string;
}
const initialState: InitStatePostType = {
  posts: [],
  post: null,
  postUpload: {
    video: null,
    thumnail: null,
    title: '',
    visibility: 1,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  pecentLoading: 99,
  message: '',
};
const postSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPostUpload(state, action) {
      state.postUpload = action.payload;
    },
    setPecentLoading(state, action) {
      state.pecentLoading = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.pending, (state: InitStatePostType) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state: InitStatePostType, action) => {
        state.isError = false;
        const payload = action.payload as PostsPayload;
        state.posts = payload.posts;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getPosts.rejected, (state: InitStatePostType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const payload = action.payload as PostsPayload;
        if (payload) {
          state.message = payload.mes;
          state.posts = [];
          message.error(payload.mes);
        } else message.error('Unknown error occurred');
      })
      .addCase(uploadPost.pending, (state: InitStatePostType) => {
        state.isLoading = true;
      })
      .addCase(uploadPost.fulfilled, (state: InitStatePostType, action) => {
        state.isError = false;
        const payload = action.payload as PostPayload;
        state.post = payload.post;
        state.isLoading = false;
        state.isSuccess = true;
        state.pecentLoading = 100;
        message.success(payload.mes);
      })
      .addCase(uploadPost.rejected, (state: InitStatePostType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const payload = action.payload as PostsPayload;
        if (payload) {
          state.message = payload.mes;
          state.post = null;
          message.error(payload.mes);
        } else message.error('Unknown error occurred');
      }),
});
export const { setPostUpload, setPecentLoading } = postSlice.actions;
export default postSlice.reducer;
