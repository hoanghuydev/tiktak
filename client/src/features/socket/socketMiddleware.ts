import { Middleware } from 'redux';
import { io, Socket } from 'socket.io-client';
import {
  connectionEstablished,
  receiveMessage,
  startConnecting,
  submitMessage,
} from './socketSlice';
import { ChatEvent } from '@/utils/constants';
import { UserModel } from '@/models/user';
import { MessageModel } from '@/models/message';
const socketMiddleware: Middleware = (store) => {
  let socket: Socket;
  return (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState().socket.isConnected;
    console.log('Socket middleware');
    const user: UserModel = store.getState().auth.user;
    if (startConnecting.match(action) && user) {
      socket = io('http://localhost:8000', {
        withCredentials: true,
      });

      socket.on('connect', () => {
        store.dispatch(connectionEstablished());
        socket.emit(ChatEvent.ADD_USER_ONLINE_ACTION_SOCKET, user.id);
      });

      socket.on(
        ChatEvent.GET_NEW_MESSAGE_ACTION_SOCKET,
        (message: MessageModel) => {
          store.dispatch(receiveMessage({ message }));
        }
      );
    }

    //   if (submitMessage.match(action) && isConnectionEstablished) {
    //     socket.emit(ChatEvent.SendMessage, action.payload.content);
    //   }

    next(action);
  };
};

export default socketMiddleware;
