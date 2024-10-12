import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService, {
  AuthPayload,
  LoginParams,
  RegisterParams,
  VertifyParams,
} from './authService';
import { UserModel } from '@/models/user';
import { Bounce, toast } from 'react-toastify';
import showToast from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import UserService from '../user/userService';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '@/utils/handleSliceState';
export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterParams, thunkAPI) => {
    try {
      const resp = await AuthService.register(user);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginParams, thunkAPI) => {
    try {
      const resp = await AuthService.login(user);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const verifyAccount = createAsyncThunk(
  'auth/vertify',
  async (verifyInfo: VertifyParams, thunkAPI) => {
    try {
      return await AuthService.verifyAccount(verifyInfo);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loginSuccess = createAsyncThunk(
  'auth/loginSuccess',
  async (data, thunkAPI) => {
    try {
      return await AuthService.loginSuccess();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateFullNameAndUserName = createAsyncThunk(
  'user/updateFullNameAndUserName',
  async (
    {
      userId,
      userName,
      fullName,
      bio,
    }: { userId: number; userName?: string; fullName?: string; bio?: string },
    thunkAPI
  ) => {
    try {
      const resp = await UserService.updateFullNameAndUserName(userId, {
        userName,
        fullName,
        bio,
      });
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (
    { userId, avatarFile }: { userId: number; avatarFile: File },
    thunkAPI
  ) => {
    try {
      const resp = await UserService.updateAvatar(userId, avatarFile);
      return resp;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export interface InitStateAuthType {
  user: UserModel | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: InitStateAuthType = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state: InitStateAuthType) => {
        handlePending(state);
      })
      .addCase(register.fulfilled, (state: InitStateAuthType, action) => {
        handleFulfilled(state, action);
      })
      .addCase(register.rejected, (state: InitStateAuthType, action) => {
        handleRejected(state, action);
      })

      .addCase(login.pending, (state: InitStateAuthType) => {
        handlePending(state);
      })
      .addCase(login.fulfilled, (state: InitStateAuthType, action) => {
        const payload = action.payload as AuthPayload;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = payload.user;
        handleFulfilled(state, action);
      })
      .addCase(login.rejected, (state: InitStateAuthType, action) => {
        handleRejected(state, action);
      })
      .addCase(loginSuccess.pending, (state: InitStateAuthType) => {
        handlePending(state);
      })
      .addCase(loginSuccess.fulfilled, (state: InitStateAuthType, action) => {
        const payload = action.payload as AuthPayload;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = payload.user;
        handleFulfilled(state, action);
      })
      .addCase(loginSuccess.rejected, (state: InitStateAuthType, action) => {
        state.user = null;
        handleRejected(state, action);
      })
      .addCase(verifyAccount.pending, (state: InitStateAuthType) => {
        handlePending(state);
      })
      .addCase(verifyAccount.fulfilled, (state: InitStateAuthType, action) => {
        handleFulfilled(state, action);
      })
      .addCase(verifyAccount.rejected, (state: InitStateAuthType, action) => {
        handleRejected(state, action);
      })
      .addCase(
        updateFullNameAndUserName.pending,
        (state: InitStateAuthType) => {
          handlePending(state);
        }
      )
      .addCase(
        updateFullNameAndUserName.fulfilled,
        (state: InitStateAuthType, action) => {
          state.user = { ...state.user, ...action.payload.user };
          handleFulfilled(state, action);
        }
      )
      .addCase(
        updateFullNameAndUserName.rejected,
        (state: InitStateAuthType, action) => {
          handleRejected(state, action);
        }
      )
      .addCase(updateAvatar.pending, (state: InitStateAuthType) => {
        handlePending(state);
      })
      .addCase(updateAvatar.fulfilled, (state: InitStateAuthType, action) => {
        state.user = { ...state.user, ...action.payload.user };
        handleFulfilled(state, action);
      })
      .addCase(updateAvatar.rejected, (state: InitStateAuthType, action) => {
        handleRejected(state, action);
      });
  },
});
export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
