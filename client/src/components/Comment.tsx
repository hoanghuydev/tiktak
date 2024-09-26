import CommentService from '@/features/comment/commentService';
import { CommentModel } from '@/models/comment';
import { ReplyCommentModel } from '@/models/replyComment';
import { currentUserSelector } from '@/redux/selector';
import { message } from 'antd';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReplyCommnet from './ReplyCommnet';

const Comment = ({
  comment,
  isReplyComment,
  className,
}: {
  comment: CommentModel | ReplyCommentModel;
  isReplyComment?: boolean;
  className?: string;
}) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(comment.isLiked == 1 ?? false);
  const [likes, setLikes] = useState<number>(comment.likes ?? 0);
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const handleLikeAndUnlikeComment = (commentId: number) => {
    if (!user) navigate('/login');
    if (isReplyComment)
      CommentService.likeAndUnlikeCommentReply(commentId, !isLike)
        .then((resp) => {
          setLikes((prev) => {
            return !isLike ? prev + 1 : prev - 1;
          });
          setIsLike(!isLike);
        })
        .catch((err) => message.error(err.msg));
    else
      CommentService.likeAndUnlikeCommentPost(commentId, !isLike)
        .then(() => {
          setLikes((prev) => {
            return !isLike ? prev + 1 : prev - 1;
          });
          setIsLike(!isLike);
        })
        .catch((err) => message.error(err.msg));
  };

  return (
    <div className={clsx(className)}>
      <div className="flex gap-3">
        {/* Commenter Avatar */}
        <div
          className={clsx(
            'avatar rounded-full overflow-hidden',
            !isReplyComment && 'min-w-10 max-w-10 h-10',
            isReplyComment && 'min-w-6 max-w-6 h-6'
          )}
        >
          <img
            className="w-full h-full object-cover object-center"
            src={
              (isReplyComment
                ? (comment as ReplyCommentModel).responderData.avatarData.url
                : (comment as CommentModel).commenterData.avatarData.url) ?? ''
            }
            alt="Avatar User"
          />
        </div>
        {/* End Commenter Avatar */}
        <div className="w-full">
          <p className="text-[14px] font-semibold">
            {(isReplyComment
              ? (comment as ReplyCommentModel).responderData.fullName
              : (comment as CommentModel).commenterData.fullName) ?? ''}
          </p>
          <p className="text-[16px] font-normal">{comment.content}</p>
          {/* Comment Info*/}
          <div className="flex justify-between">
            <div className="flex gap-6 text-[#0000007a] text-[14px]">
              <p className="text-[#0000007a] ">
                {new Date(comment.createdAt ?? new Date()).toLocaleDateString()}
              </p>
              <p
                className="font-semibold text-[#0000007a] "
                onClick={() => {
                  setShowReplyForm(true);
                }}
              >
                Reply
              </p>
            </div>
            {/* Comment Like */}
            <div className="ms-5 flex gap-2 text-[#0000007a] ">
              {!isLike && (
                <IoHeartOutline
                  onClick={() => handleLikeAndUnlikeComment(comment.id!)}
                  className="my-auto "
                  size={16}
                />
              )}
              {!isLike && !user && (
                <IoHeartOutline
                  onClick={() => handleLikeAndUnlikeComment(comment.id!)}
                  className="my-auto "
                  size={16}
                />
              )}
              {isLike && (
                <IoHeart
                  onClick={() => handleLikeAndUnlikeComment(comment.id!)}
                  className="text-primary my-auto"
                  size={16}
                />
              )}
              <p className="text-[#0000007a] text-[16px] my-auto">{likes}</p>
            </div>
          </div>
          {/* End Comment Info*/}
          {/* Reply Comment */}
          {!isReplyComment && (comment as CommentModel).replies > 0 && (
            <ReplyCommnet comment={comment as CommentModel} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
