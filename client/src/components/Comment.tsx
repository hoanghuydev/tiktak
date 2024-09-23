import CommentService from '@/features/comment/commentService';
import { CommentModel } from '@/models/comment';
import { ReplyCommentModel } from '@/models/replyComment';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import {
  IoHeartOutline,
  IoHeart,
  IoChevronUp,
  IoChevronDown,
} from 'react-icons/io5';

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
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [commentReplies, setCommentReplies] = useState<ReplyCommentModel[]>([]);
  const [repliesRemaining, setRepliesRemaining] = useState<number>(
    !isReplyComment ? (comment as CommentModel).replies : 0
  );
  const repliesCommentElement = useRef<HTMLDivElement | null>(null);
  const handleShowRepliesComment = async (): Promise<void> => {
    const resp = await CommentService.getRepliesCommentByCommentId(comment.id!);
    setCommentReplies(resp.comments);
    let repliesCmtRemaining = repliesRemaining - resp.comments.length;
    repliesCmtRemaining = repliesCmtRemaining > 0 ? repliesCmtRemaining : 0;
    setRepliesRemaining(repliesCmtRemaining);
    setShowAllReplies(repliesCmtRemaining == 0);
  };

  function handleHideReplies(): void {
    if (repliesCommentElement.current) {
      setShowAllReplies(false);
      setCommentReplies([]);
      setRepliesRemaining((comment as CommentModel).replies);
    }
  }

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
              {comment.isLiked == 0 && (
                <IoHeartOutline className="my-auto " size={16} />
              )}
              {comment.isLiked == 1 && (
                <IoHeart className="text-primary my-auto" size={16} />
              )}
              <p className="text-[#0000007a] text-[16px] my-auto">
                {comment.likes}
              </p>
            </div>
          </div>
          {/* End Comment Info*/}
          {/* Reply Comment */}
          {(!isReplyComment
            ? (comment as CommentModel).replies > 0
            : false) && (
            <div className="mt-3">
              <div className="replies-comment" ref={repliesCommentElement}>
                {commentReplies.length > 0 &&
                  commentReplies.map((reply) => (
                    <Comment
                      key={reply.id}
                      isReplyComment={true}
                      comment={reply}
                      className="mb-2"
                    />
                  ))}
              </div>
              <div className="text-[14px] text-[#0000007a] font-semibold  flex flex-nowrap gap-3">
                <div className="bg-[#0000007a] w-8 h-[1px] my-auto"></div>
                {!showAllReplies && (
                  <span
                    className=" my-auto flex"
                    onClick={handleShowRepliesComment}
                  >
                    <p className="whitespace-nowrap text-[#0000007a] leading-[1]">{` View ${repliesRemaining} replies`}</p>
                    <IoChevronDown
                      size={16}
                      className="text-[#0000007a]  my-auto ms-1"
                    />
                  </span>
                )}
                {showAllReplies && (
                  <span className="my-auto flex" onClick={handleHideReplies}>
                    <p className="whitespace-nowrap text-[#0000007a] leading-[1]">
                      Hide
                    </p>
                    <IoChevronUp
                      size={16}
                      className="text-[#0000007a]  mt-auto ms-1"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
