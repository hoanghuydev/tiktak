import { PostModel } from '@/models/post';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CommnentService, {
  CommentPayload,
  CommentsPayload,
} from './commentService';
import { PaginationModel } from '@/models';
import { message } from 'antd';
import { PostUploadModel } from '@/models/postUpload';
import AbstractPayload from '@/utils/abtractPayloadType';
import { CommentModel } from '@/models/comment';
import { RootState } from '@/redux/reducer';

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
export const commentPost = createAsyncThunk(
  'post/commentPost',
  async (
    { postId, content }: { postId: number; content: string },
    { dispatch, getState, rejectWithValue } // Destructure getState from thunkAPI
  ) => {
    try {
      const resp = await CommnentService.commentPost(postId, content);
      resp.comment.commenterData = (getState() as RootState).auth.user!;
      return resp;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface InitStateCommentType {
  comments: CommentModel[];
  comment: CommentModel | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: InitStateCommentType = {
  comments: [],
  comment: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Utility functions
const handlePending = (state: InitStateCommentType) => {
  state.isLoading = true;
};

const handleFulfilled = (state: InitStateCommentType, action: any) => {
  state.isError = false;
  state.isLoading = false;
  state.isSuccess = true;
  if (action.payload) {
    state.message = action.payload.mes;
  }
};

const handleRejected = (state: InitStateCommentType, action: any) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  if (action.payload) {
    state.message = action.payload.mes;
    message.error(action.payload.mes);
  }
};

// Slice
const commentSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addComment(state, action: { payload: CommentModel; type: string }) {
      state.comments.push(action.payload);
    },
    setComment(state, action: { payload: CommentModel; type: string }) {
      state.comment = action.payload;
    },
    setComments(state, action: { payload: CommentModel[]; type: string }) {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCommentsByPostId.pending, handlePending)
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        const payload = action.payload as CommentsPayload;
        state.comments = payload.comments;
        handleFulfilled(state, action);
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        const payload = action.payload as CommentsPayload;
        if (payload) {
          state.message = payload.mes;
          state.comments = [];
        }
        handleRejected(state, action);
      })
      .addCase(commentPost.pending, handlePending)
      .addCase(commentPost.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const payload = action.payload as CommentPayload;
        state.comments.unshift(payload.comment);
      })
      .addCase(commentPost.rejected, handleRejected),
});

export const { addComment, setComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;
