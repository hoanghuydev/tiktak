import { message } from 'antd';
import AbstractPayload from './abtractPayloadType';
import { PayloadAction } from '@reduxjs/toolkit';

// Define generic functions with <T>
const handlePending = <T>(state: T & { isLoading: boolean }) => {
  state.isLoading = true;
};

const handleFulfilled = <T>(
  state: T & {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message?: string;
  },
  action: { payload: any; type: string },
  isShowMessage?: boolean
) => {
  state.isError = false;
  state.isLoading = false;
  state.isSuccess = true;
  if (action.payload && isShowMessage) {
    state.message = action.payload.mes;
  }
};

const handleRejected = <T>(
  state: T & {
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message?: string;
  },
  action: { payload: any; type: string }
) => {
  state.isLoading = false;
  state.isError = true;
  state.isSuccess = false;
  if (action.payload) {
    state.message = action.payload.mes;
    message.error(action.payload.mes);
  }
};

export { handlePending, handleFulfilled, handleRejected };
