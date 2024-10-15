export enum ChatEvent {
  RECALL_MESSAGE_ACTION_SOCKET = 'recallMessage',
  GET_NEW_MESSAGE_ACTION_SOCKET = 'newMessage',
  ADD_USER_ONLINE_ACTION_SOCKET = 'addUser',
  GET_USER_ONLINE_ACTION_SOCKET = 'getUsers',
  JOIN_CHATROOM_ACTION_SOCKET = 'joinChatroom',
  LEAVE_CHATROOM_ACTION_SOCKET = 'leaveChatroom',
}
export const SERVER_URL = 'http://localhost:8000';
export const URL_CLIENT = 'http://localhost:5173';
