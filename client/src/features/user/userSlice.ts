import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserService, { GetUserParams } from './userService';
import { UserModel } from '@/models/user';
import { message } from 'antd';
import postSlice from '../post/postSlice';
import AbstractPayload from '@/utils/abtractPayloadType';
import { PaginationModel } from '@/models';

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
const handlePending = (state: InitStateUserType) => {
  state.isLoading = true;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        searchUsersByName.rejected,
        (state: InitStateUserType, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          const payload = action.payload as UsersPayload;
          if (payload) {
            state.message = payload.mes;
            state.users = [];
            message.error(payload.mes);
          } else {
            message.error('Unknown error occurred');
          }
        }
      )
      .addCase(searchUsersByName.pending, handlePending)

      .addCase(
        searchUsersByName.fulfilled,
        (state: InitStateUserType, action) => {
          state.isError = false;
          const payload = action.payload as UsersPayload;
          state.users = payload.users;
          state.isLoading = false;
          state.isSuccess = true;
        }
      );
  },
});
export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
