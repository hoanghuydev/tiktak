import { AbstractModel } from '.';
import { UserModel } from './user';

export interface CommentModel extends AbstractModel {
  commenter: number;
  postId: number;
  content: string;
  likes: number;
  replies: number;
  repliesRemaining: number;
  commentReplies: CommentModel[];
  isLiked: number;
  commenterData: UserModel;
}
