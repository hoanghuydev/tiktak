import { AbstractModel } from '.';
import { UserModel } from './user';

export interface CommentModel extends AbstractModel {
  commenter: number;
  postId: number;
  content: string;
  likes: number;
  replies: number;
  isLiked: number;
  commenterData: UserModel;
}
