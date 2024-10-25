import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatroomModel } from '@/models/chatroom';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/utils/handleSliceState';
import ChatroomService, {
  ChatroomPayload,
  ChatroomsPayload,
} from './chatroomServices';

// Async Thunks
export const getChatroomByUserId = createAsyncThunk(
  'post/getChatroomByUserId',
  async (userId: number, thunkAPI) => {
    try {
      const resp = await ChatroomService.getChatroomsByUserId(userId);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export interface InitStateChatroomType {
  chatrooms: ChatroomModel[];
  chatroom: ChatroomModel | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

// Initial state
const initialState: InitStateChatroomType = {
  chatrooms: [],
  chatroom: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Slice
const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    setComment(state, action: { payload: ChatroomModel; type: string }) {
      state.chatroom = action.payload;
    },
    setComments(state, action: { payload: ChatroomModel[]; type: string }) {
      state.chatrooms = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getChatroomByUserId.pending, handlePending)
      .addCase(getChatroomByUserId.fulfilled, (state, action) => {
        const payload = action.payload as ChatroomsPayload;
        state.chatrooms = payload.chatrooms;
        handleFulfilled(state, action);
      })
      .addCase(getChatroomByUserId.rejected, (state, action) => {
        const payload = action.payload as ChatroomsPayload;
        if (payload) {
          state.message = payload.mes;
          state.chatrooms = [];
        }
        handleRejected(state, action);
      }),
});

// export const {} = chatroomSlice.actions;
export default chatroomSlice.reducer;
