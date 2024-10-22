// src/features/socket/socketSlice.ts
import { MessageModel } from '@/models/message';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

interface ChatroomModel {
  id: number;
  name: string;
  messages: MessageModel[];
}

interface SocketState {
  chatrooms: ChatroomModel[];
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  chatrooms: [],
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
      state.isEstablishingConnection = false;
    },
    receiveAllChatrooms: (state, action: PayloadAction<ChatroomModel[]>) => {
      state.chatrooms = action.payload;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{ chatroomId: number; message: MessageModel }>
    ) => {
      const chatroom = state.chatrooms.find(
        (room) => room.id === action.payload.chatroomId
      );
      if (chatroom) {
        chatroom.messages.push(action.payload.message);
      }
    },
    submitMessage: (
      state,
      action: PayloadAction<{ chatroomId: number; message: string }>
    ) => {
      // Logic to submit message to server will be handled by a middleware or saga.
      return;
    },
    // joinChatroom: (state, action: PayloadAction<ChatroomModel>) => {
    //   const exists = state.chatrooms.find(
    //     (room) => room.id === action.payload.id
    //   );
    //   if (!exists) {
    //     state.chatrooms.push(action.payload);
    //   }
    // },
    // leaveChatroom: (state, action: PayloadAction<number>) => {
    //   state.chatrooms = state.chatrooms.filter(
    //     (room) => room.id !== action.payload
    //   );
    // },
  },
});

export const {
  startConnecting,
  connectionEstablished,
  receiveAllChatrooms,
  submitMessage,
  receiveMessage,
  // joinChatroom,
  // leaveChatroom,
} = socketSlice.actions;

export default socketSlice.reducer;
export type InitStateSocketType = SocketState;
