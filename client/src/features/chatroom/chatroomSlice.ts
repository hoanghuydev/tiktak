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
import { RootState } from '@/redux/reducer';
import socketSlice, { setChatrooms } from '@/features/socket/socketSlice';

// Async Thunks
export const getChatroomsByUserId = createAsyncThunk(
  'post/getChatroomsByUserId',
  async (userId: number, thunkAPI) => {
    try {
      const resp = await ChatroomService.getChatroomsByUserId(userId);
      thunkAPI.dispatch(setChatrooms(resp.chatrooms));
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
    setChatroom(state, action: PayloadAction<ChatroomModel | null>) {
      state.chatroom = action.payload;
    },
    setChatrooms(state, action: PayloadAction<ChatroomModel[]>) {
      state.chatrooms = action.payload;
    },
  },
  extraReducers: (builder) => builder,
});

export const { setChatroom } = chatroomSlice.actions;
export default chatroomSlice.reducer;
