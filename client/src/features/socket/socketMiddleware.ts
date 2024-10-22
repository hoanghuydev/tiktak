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
  let pendingActions: any[] = [];

  return (next) => (action) => {
    const isConnectionEstablished =
      socket && store.getState().socket.isConnected;
    const user: UserModel = store.getState().auth.user;

    if (startConnecting.match(action) && user) {
      socket = io('http://localhost:8000', {
        withCredentials: true,
        query: { token: localStorage.getItem('accessToken') },
      });

      socket.on('connect', () => {
        store.dispatch(connectionEstablished());

        socket.emit(ChatEvent.ADD_USER_ONLINE_ACTION_SOCKET, user.id);

        socket.on(
          ChatEvent.GET_NEW_MESSAGE_ACTION_SOCKET,
          (data: { message: MessageModel; chatroomId: number }) => {
            store.dispatch(receiveMessage(data));
          }
        );

        socket.on(
          ChatEvent.GET_USER_ONLINE_ACTION_SOCKET,
          (users: [{ userId: number }]) => {
            // console.log(users);
          }
        );
        // Process all queued actions (join and leave chatroom)
        pendingActions.forEach((pendingAction) => {
          // if (pendingAction.type === 'socket/joinChatroom') {
          //   socket.emit(
          //     ChatEvent.JOIN_CHATROOM_ACTION_SOCKET,
          //     pendingAction.payload
          //   );
          // }
          // if (pendingAction.type === 'socket/leaveChatroom') {
          //   socket.emit(
          //     ChatEvent.LEAVE_CHATROOM_ACTION_SOCKET,
          //     pendingAction.payload
          //   );
          // }
        });
        pendingActions = [];
      });
    }

    // if (joinChatroom.match(action)) {
    //   if (isConnectionEstablished) {
    //     socket.emit(ChatEvent.JOIN_CHATROOM_ACTION_SOCKET, action.payload);
    //   } else {
    //     pendingActions.push(action);
    //   }
    // }

    // if (leaveChatroom.match(action)) {
    //   if (isConnectionEstablished) {
    //     socket.emit(ChatEvent.LEAVE_CHATROOM_ACTION_SOCKET, action.payload);
    //   } else {
    //     pendingActions.push(action);
    //   }
    // }

    next(action);
  };
};

export default socketMiddleware;
