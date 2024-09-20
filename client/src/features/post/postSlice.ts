import { PostModel } from '@/models/post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import PostService from './postService';
import { PaginationModel } from '@/models';
import { message } from 'antd';
import { PostUploadModel } from '@/models/postUpload';
import AbstractPayload from '@/utils/abtractPayloadType';

// Async Thunks
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

export const getFollowingPosts = createAsyncThunk(
  'post/getFollowingPosts',
  async (postId, thunkAPI) => {
    try {
      const resp = await PostService.getFollowingPosts();
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFriendPosts = createAsyncThunk(
  'post/getFriendPosts',
  async (postId, thunkAPI) => {
    try {
      const resp = await PostService.getFriendPosts();
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPostById = createAsyncThunk(
  'post/getPostById',
  async (postId: number, thunkAPI) => {
    try {
      const resp = await PostService.getPostById(postId);
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

// Interfaces
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

// Initial state
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

// Utility functions
const handlePending = (state: InitStatePostType) => {
  state.isLoading = true;
};

const handleFulfilled = (state: InitStatePostType, action: any) => {
  state.isError = false;
  const payload = action.payload as PostsPayload;
  state.posts = payload.posts;
  state.isLoading = false;
  state.isSuccess = true;
};

const handleRejected = (state: InitStatePostType, action: any) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  const payload = action.payload as PostsPayload;
  if (payload) {
    state.message = payload.mes;
    state.posts = [];
    message.error(payload.mes);
  } else {
    message.error('Unknown error occurred');
  }
};

// Slice
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostUpload(state, action: { payload: PostUploadModel; type: string }) {
      state.postUpload = action.payload;
    },
    setPecentLoading(state, action: { payload: number; type: string }) {
      state.pecentLoading = action.payload;
    },
    setPosts(state, action: { payload: PostModel[]; type: string }) {
      state.posts = action.payload;
    },
    setPost(state, action: { payload: PostModel; type: string }) {
      state.post = action.payload;
    },
    setCountLike(state, action: { payload: number; type: string }) {
      state.post!.likes = action.payload;
    },
    setCountShare(state, action: { payload: number; type: string }) {
      state.post!.shares = action.payload;
    },
    setCountCommnent(state, action: { payload: number; type: string }) {
      state.post!.comments = action.payload;
    },
    setIsLike(state, action: { payload: boolean; type: string }) {
      state.post!.isLiked = action.payload;
    },
    setIsFollow(state, action: { payload: boolean; type: string }) {
      state.post!.isLiked = action.payload;
    },
    setPostLoading(state, action: { payload: boolean; type: string }) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getPosts.pending, handlePending)
      .addCase(getPosts.fulfilled, handleFulfilled)
      .addCase(getPosts.rejected, handleRejected)
      .addCase(getFollowingPosts.pending, handlePending)
      .addCase(getFollowingPosts.fulfilled, handleFulfilled)
      .addCase(getFollowingPosts.rejected, handleRejected)
      .addCase(getFriendPosts.pending, handlePending)
      .addCase(getFriendPosts.fulfilled, handleFulfilled)
      .addCase(getFriendPosts.rejected, handleRejected)
      .addCase(uploadPost.pending, handlePending)
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
        } else {
          message.error('Unknown error occurred');
        }
      })

      .addCase(getPostById.rejected, (state: InitStatePostType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const payload = action.payload as PostPayload;
        if (payload) {
          state.message = payload.mes;
          state.post = null;
          message.error(payload.mes);
        } else {
          message.error('Unknown error occurred');
        }
      })
      .addCase(getPostById.pending, handlePending)

      .addCase(getPostById.fulfilled, (state: InitStatePostType, action) => {
        state.isError = false;
        const payload = action.payload as PostPayload;
        state.post = payload.post;
        state.isLoading = false;
        state.isSuccess = true;
      }),
});

export const {
  setPostUpload,
  setPecentLoading,
  setPost,
  setPosts,
  setPostLoading,
  setCountLike,
  setCountShare,
  setCountCommnent,
  setIsLike,
  setIsFollow,
} = postSlice.actions;
export default postSlice.reducer;
