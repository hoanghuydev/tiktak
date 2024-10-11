import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import UserService, { GetUserParams } from './userService';
import { UserModel } from '@/models/user';
import { message } from 'antd';
import postSlice, { setIsFollow } from '../post/postSlice';
import AbstractPayload from '@/utils/abtractPayloadType';
import { PaginationModel } from '@/models';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/utils/handleSliceState';

export const getUser = createAsyncThunk(
  'auth/register',
  async (userId: GetUserParams, thunkAPI) => {
    try {
      const resp = await UserService.getUser(userId);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const searchUsersByName = createAsyncThunk(
  'user/searchUsersByName',
  async (name: string, thunkAPI) => {
    try {
      const resp = await UserService.searchUsersByFullName(name);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface UsersPayload extends AbstractPayload {
  users: UserModel[];
  pagination: PaginationModel;
}
export interface InitStateUserType {
  users: UserModel[];
  user: UserModel;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: InitStateUserType = {
  users: [],
  user: {} as UserModel,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: { payload: UserModel[]; type: string }) {
      state.users = action.payload;
    },
    setUser(state, action: { payload: UserModel; type: string }) {
      state.user = action.payload;
    },
    setUserAvatar(state, action: { payload: string; type: string }) {
      state.user.avatarData.url = action.payload;
    },
    setIsFollowUser(state, action: PayloadAction<boolean>) {
      state.user.isFollow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        searchUsersByName.rejected,
        (state: InitStateUserType, action) => {
          state.users = [];
          handleRejected(state, action);
        }
      )
      .addCase(searchUsersByName.pending, (state) => {
        handlePending(state);
      })
      .addCase(
        searchUsersByName.fulfilled,
        (state: InitStateUserType, action) => {
          const payload = action.payload as UsersPayload;
          state.users = payload.users;
          handleFulfilled(state, action);
        }
      );
  },
});
export const { setUser, setUsers, setIsFollowUser, setUserAvatar } =
  userSlice.actions;
export default userSlice.reducer;
