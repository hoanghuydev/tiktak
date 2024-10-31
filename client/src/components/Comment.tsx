import { useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart, IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import clsx from 'clsx';
import ReactTimeago from 'react-timeago';
import CommentService from '@/features/comment/commentService';
import ReplyCommnet from './ReplyCommnet';
import {
  currentUserSelector,
  getCommentByIdSelector,
  getCommentRepliesByIdSelector,
  getPostSelector,
} from '@/redux/selector';
import { CommentModel } from '@/models/comment';
import CommentForm from '@/site/components/Post/CommentForm';
import { RootState } from '@/redux/reducer';
import { AppDispatch } from '@/redux/store';
import {
  addComment,
  commentPost,
  replyComment,
  setRepliesRemainingByCommentId,
} from '@/features/comment/commentSlice';
import InputFormEditable from './InputFormEditable';

const Comment = ({
  comment,
  isReplyComment = false,
  className,
  parentCommentId,
}: {
  comment: CommentModel;
  isReplyComment?: boolean;
  className?: string;
  parentCommentId?: number;
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLike, setIsLike] = useState(comment.isLiked === 1);
  const [likes, setLikes] = useState(comment.likes ?? 0);
  const user = useSelector(currentUserSelector);
  const post = useSelector(getPostSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const repliesRemaining: number = comment.replies;
  const commentReplies: CommentModel[] = comment.commentReplies ?? [];
  useEffect(() => {
    dispatch(
      setRepliesRemainingByCommentId({
        commentId: comment.id,
        repliesRemaining: comment.replies,
      })
    );
  }, [comment.id]);

  const handleLikeAndUnlikeComment = (commentId: number) => {
    if (!user) return navigate('/login');

    CommentService.likeAndUnlikeCommentPost(commentId, !isLike)
      .then(() => {
        setLikes((prev: number) => prev + (isLike ? -1 : 1)); // Explicit type for 'prev'
        setIsLike(!isLike);
      })
      .catch((err) => message.error(err.msg));
  };
  const handleReply = () => {
    if (!user) {
      navigate('login');
      return;
    }
    setShowReplyForm(true);
  };
  const handleSubmitComment = async (commentText: string) => {
    if (!commentText.trim()) return; // Ensure non-empty input
    let parentCommentId2 = parentCommentId ?? comment.id!;
    if (parentCommentId2) {
      // Handling reply to a comment
      try {
        const resp = await dispatch(
          replyComment({
            postId: post.id,
            parentCommentId: parentCommentId2,
            content: commentText,
          })
        ).unwrap();
        if (resp) {
          dispatch(
            addComment({
              parentCommentId: parentCommentId2,
              comment: resp.comment,
            })
          );
        }
      } catch (error) {
        message.error('Failed to add reply');
      }
    } else {
      // Posting a new comment
      try {
        await dispatch(commentPost({ postId: post.id, content: commentText }));
      } catch (error) {
        message.error('Failed to post comment');
      }
    }
  };

  const userData = comment.commenterData;

  return (
    <div className={clsx(className)}>
      <div className="flex gap-3">
        <Link to={`/profile/@${userData.userName ?? ''}`} className="h-fit">
          <div
            className={clsx(
              'avatar rounded-full overflow-hidden',
              isReplyComment ? 'min-w-6 max-w-6 h-6' : 'min-w-10 max-w-10 h-10'
            )}
          >
            <img
              className="w-full h-full object-cover"
              src={userData.avatarData.url ?? ''}
              alt="Avatar User"
            />
          </div>
        </Link>
        <div className="w-full">
          <Link to={`/profile/@${userData.userName ?? ''}`}>
            <p className="text-[14px] font-semibold">
              {userData.fullName ?? ''}
            </p>
          </Link>
          <p className="text-[16px] font-normal">{comment.content}</p>
          <div className="flex justify-between">
            <div className="flex gap-6 text-[14px] text-[#0000007a]">
              <ReactTimeago date={comment.createdAt} />
              <p
                className="font-semibold text-[#0000007a] hover:cursor-pointer hover:opacity-90"
                onClick={handleReply}
              >
                Reply
              </p>
            </div>
            <div className="flex gap-2 text-[#0000007a]">
              {isLike ? (
                <IoHeart
                  onClick={() => handleLikeAndUnlikeComment(comment.id!)}
                  className="text-primary my-auto hover:cursor-pointer"
                  size={16}
                />
              ) : (
                <IoHeartOutline
                  onClick={() => handleLikeAndUnlikeComment(comment.id!)}
                  size={16}
                  className=" my-auto hover:cursor-pointer"
                />
              )}
              <p className=" my-auto">{likes}</p>
            </div>
          </div>
          {showReplyForm && (
            <div className="flex">
              <InputFormEditable
                placeholder="Add comment..."
                handleSubmit={handleSubmitComment}
                maxCharacters={150}
              />
              <IoClose
                size={20}
                className="my-auto hover:cursor-pointer hover:opacity-90"
                onClick={() => {
                  setShowReplyForm(false);
                }}
              />
            </div>
          )}
          {!isReplyComment && comment.replies > 0 && (
            <ReplyCommnet
              comment={comment}
              repliesRemaining={repliesRemaining}
              commentReplies={commentReplies}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
