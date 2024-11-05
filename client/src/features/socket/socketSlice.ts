// src/features/socket/socketSlice.ts
import { ChatroomModel } from '@/models/chatroom';
import { MessageModel } from '@/models/message';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';
import MessageService from '../message/messageService';
import { message } from 'antd';
import AbstractPayload from '@/utils/abtractPayloadType';

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

export const fetchMessagesByChatroomId = createAsyncThunk(
  'socket/fetchMessagesByChatroomId',
  async (chatroomId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await MessageService.getMessagesByChatroomId(chatroomId);
      return { chatroomId, messages: response.messages };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAllMessage = createAsyncThunk(
  'socket/deleteAllMessage',
  async (chatroomId: number, { rejectWithValue, dispatch }) => {
    try {
      await MessageService.deleteAllMessageUpToNow(chatroomId);
      return { chatroomId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteMessageById = createAsyncThunk(
  'socket/deleteMessageById',
  async (
    data: { chatroomId: number; messageId: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await MessageService.deleteMessageById(data.messageId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// Helper func
const updateLastMessage = (chatroom: ChatroomModel) => {
  const lastIndex = chatroom.messages.length - 1;
  chatroom.lastMessage = chatroom.messages[lastIndex];
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
      const { chatroomId, message } = action.payload;
      const chatroom = state.chatrooms.find((room) => room.id == chatroomId);
      if (chatroom) {
        chatroom.messages = [message, ...(chatroom.messages || [])];
        updateLastMessage(chatroom);
      }
    },
    recallMessage: (
      state,
      action: PayloadAction<{ chatroomId: number; message: MessageModel }>
    ) => {
      const chatroom = state.chatrooms.find(
        (room) => room.id === action.payload.chatroomId
      );
      if (chatroom) {
        chatroom.messages = chatroom.messages.filter(
          (msg) => msg.id !== action.payload.message.id
        );
        updateLastMessage(chatroom);
      }
    },
    setMessagesByChatroomId: (
      state,
      action: PayloadAction<{ chatroomId: number; messages: MessageModel[] }>
    ) => {
      const { chatroomId, messages } = action.payload;
      const chatroom = state.chatrooms.find((room) => room.id === chatroomId);
      if (chatroom) {
        chatroom.messages = messages;
        updateLastMessage(chatroom);
      }
    },

    submitMessage: (
      state,
      action: PayloadAction<{ chatroomId: number; message: string }>
    ) => {
      return;
    },
    setChatrooms(state, action: PayloadAction<ChatroomModel[]>) {
      state.chatrooms = action.payload;
    },
    // joinChatroom: (state, action: PayloadAction<ChatroomModel>) => {
    //   const exists = state.chatrooms.find(
    //     (room) => room.id === action.payload.id
    //   );
    //   if (!exists) {
    //     state.chatrooms.unshift(action.payload);
    //   }
    // },
    // leaveChatroom: (state, action: PayloadAction<number>) => {
    //   state.chatrooms = state.chatrooms.filter(
    //     (room) => room.id !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMessagesByChatroomId.fulfilled,
        (
          state,
          action: PayloadAction<{
            chatroomId: number;
            messages: MessageModel[];
          }>
        ) => {
          const { chatroomId, messages } = action.payload;
          const chatroom = state.chatrooms.find(
            (room) => room.id === chatroomId
          );
          if (chatroom) {
            chatroom.messages = [
              ...(messages || []),
              ...(chatroom.messages || []),
            ];
          }
        }
      )
      .addCase(fetchMessagesByChatroomId.rejected, (state, action: any) => {
        const errorMessage = action.payload.mes || 'Failed to fetch messages';
        message.error(errorMessage);
      })
      .addCase(
        deleteAllMessage.fulfilled,
        (state, action: PayloadAction<{ chatroomId: number }>) => {
          const { chatroomId } = action.payload;
          const chatroom = state.chatrooms.find(
            (room) => room.id === chatroomId
          );
          if (chatroom) {
            chatroom.messages = [];
            updateLastMessage(chatroom);
          }
        }
      )
      .addCase(deleteAllMessage.rejected, (state, action: any) => {
        const errorMessage = action.payload.mes || 'Failed to delete messages';
        message.error(errorMessage);
      })
      .addCase(
        deleteMessageById.fulfilled,
        (
          state,
          action: PayloadAction<{ chatroomId: number; messageId: number }>
        ) => {
          const { chatroomId, messageId } = action.payload;
          const chatroom = state.chatrooms.find(
            (room) => room.id === chatroomId
          );
          if (chatroom) {
            chatroom.messages = chatroom.messages.filter(
              (msg) => msg.id !== messageId
            );
            updateLastMessage(chatroom);
          }
        }
      )
      .addCase(deleteMessageById.rejected, (state, action: any) => {
        const errorMessage = action.payload.mes || 'Failed to delete message';
        message.error(errorMessage);
      });
  },
});

export const {
  startConnecting,
  connectionEstablished,
  receiveAllChatrooms,
  submitMessage,
  receiveMessage,
  // joinChatroom,
  setMessagesByChatroomId,
  // leaveChatroom,
  setChatrooms,
} = socketSlice.actions;

export default socketSlice.reducer;
export type InitStateSocketType = SocketState;
