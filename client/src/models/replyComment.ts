import { AbstractModel } from '.';
import { UserModel } from './user';

export interface ReplyCommentModel extends AbstractModel {
  likes: number | null | undefined;
  responder: number | null | undefined;
  commentPostId: number | null | undefined;
  responderData: UserModel;
  content: string | null | undefined;
  isLiked: boolean | null | undefined;
}
