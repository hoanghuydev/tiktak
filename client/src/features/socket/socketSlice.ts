// src/features/socket/socketSlice.ts
import { MessageModel } from '@/models/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  messages: MessageModel[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  messages: [],
  isEstablishingConnection: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    receiveAllMessages: (
      state,
      action: PayloadAction<{
        messages: MessageModel[];
      }>
    ) => {
      state.messages = action.payload.messages;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        message: MessageModel;
      }>
    ) => {
      state.messages.push(action.payload.message);
    },
    submitMessage: (
      state,
      action: PayloadAction<{
        content: string;
      }>
    ) => {
      return;
    },
  },
});
export const {
  startConnecting,
  connectionEstablished,
  submitMessage,
  receiveMessage,
  receiveAllMessages,
} = socketSlice.actions;

export default socketSlice.reducer;
export type InitStateSocketType = SocketState;
