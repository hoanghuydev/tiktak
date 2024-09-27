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
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ? action.error.message : '';
      })

      .addCase(login.pending, (state: InitStateAuthType) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: InitStateAuthType, action) => {
        state.isError = false;
        const payload = action.payload as AuthPayload;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = payload.user;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const payload = action.payload as AuthPayload;
        if (payload) {
          state.message = payload.mes;
          state.user = null;
          message.error(payload.mes);
        } else message.error('Unknown error occurred');
      })
      .addCase(loginSuccess.pending, (state: InitStateAuthType) => {
        state.isLoading = true;
      })
      .addCase(loginSuccess.fulfilled, (state: InitStateAuthType, action) => {
        state.isError = false;
        const payload = action.payload as AuthPayload;
        localStorage.setItem('accessToken', payload.accessToken);
        state.user = payload.user;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(loginSuccess.rejected, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        const payload = action.payload as AuthPayload;
        if (payload) {
          state.message = payload.mes;
          state.user = null;
          message.error(payload.mes);
        } else message.error('Unknown error occurred');
      })
      .addCase(verifyAccount.pending, (state: InitStateAuthType) => {
        state.isLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(verifyAccount.rejected, (state: InitStateAuthType, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ? action.error.message : '';
      });
  },
});
export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
