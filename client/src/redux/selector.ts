import { UserModel } from '@/models/user';
import { InitStateAuthType } from '../features/auth/authSlice';
import { RootState } from './reducer';
import { InitStatePostType } from '@/features/post/postSlice';
import { PostModel } from '@/models/post';
import { PostUploadModel } from '@/models/postUpload';
import { TabState, TabType } from '@/features/tab/tabSlice';
import { CommentModel } from '@/models/comment';
import { InitStateUserType } from '@/features/user/userSlice';
import { Socket } from 'socket.io-client';
import { ChatroomModel } from '@/models/chatroom';
import { MessageModel } from '@/models/message';

export const authSelector = (state: RootState): InitStateAuthType => state.auth;
export const tabSelector = (state: RootState): TabType => state.tab.tab;
export const currentUserSelector = (state: RootState): UserModel | null =>
  state.auth.user;
export const getPostsSelector = (state: RootState): PostModel[] =>
  state.post.posts;
export const getPostSelector = (state: RootState): PostModel =>
  state.post.post!;
export const postSliceSelector = (state: RootState): InitStatePostType | null =>
  state.post;
export const userSliceSelector = (state: RootState): InitStateUserType | null =>
  state.user;
export const postUploadSelector = (state: RootState): PostUploadModel | null =>
  state.post.postUpload;
export const percentLoadingPostSelector = (state: RootState): number =>
  state.post.percentLoading;
export const getPostLoadingSelector = (state: RootState): boolean =>
  state.post.isLoading;
export const getUsersSelector = (state: RootState): UserModel[] =>
  state.user.users;
export const getUserSelector = (state: RootState): UserModel => state.user.user;
export const getCommentsSelector = (state: RootState): CommentModel[] =>
  state.comment.comments;
export const getCommentSelector = (state: RootState): CommentModel =>
  state.comment.comment!;
export const getChatroomsSelector = (state: RootState): ChatroomModel[] =>
  state.socket.chatrooms;
export const getChatroomSelector = () => {
  return (state: RootState): ChatroomModel | null => {
    return (
      state.socket.chatrooms.find(
        (chatroom) => chatroom.id === state.chatroom.chatroom?.id
      ) ?? null
    );
  };
};
export const getMessagesByChatroomIdSelector = (chatroomId: number) => {
  return (state: RootState): MessageModel[] => {
    return (
      state.socket.chatrooms.find(
        (chatroom: ChatroomModel) => chatroom.id === chatroomId
      )?.messages || []
    );
  };
};
export const getCommentByIdSelector = (
  state: RootState,
  commentId: number
): CommentModel | undefined => {
  return state.comment.comments.find(
    (comment: CommentModel) => comment.id === commentId
  );
};

export const getCommentRepliesByIdSelector = (
  state: RootState,
  commentId: number
): CommentModel | undefined => {
  return state.comment.comments.find(
    (comment: CommentModel) => comment.id === commentId
  );
};
// Selectors (optional but recommended)
export const videoConfigSelector = (state: RootState) =>
  state.editVideo.videoConfig;
export const videoInfoSelector = (state: RootState) =>
  state.editVideo.videoInfo;
