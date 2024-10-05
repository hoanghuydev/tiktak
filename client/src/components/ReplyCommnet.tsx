import React, { useState } from 'react';
import Comment from './Comment';
import CommentService from '@/features/comment/commentService';
import { CommentModel } from '@/models/comment';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  setCommentsRepliesByCommentId,
  setRepliesRemainingByCommentId,
} from '@/features/comment/commentSlice';

const ReplyCommnet = ({
  comment,
  repliesRemaining,
  commentReplies,
}: {
  comment: CommentModel;
  repliesRemaining: number;
  commentReplies: CommentModel[];
}) => {
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleShowRepliesComment = async (): Promise<void> => {
    const resp = await CommentService.getRepliesCommentByCommentId(comment.id!);
    dispatch(
      setCommentsRepliesByCommentId({
        commentId: comment.id,
        commentReplies: resp.comments,
      })
    );
    let repliesCmtRemaining = repliesRemaining - resp.comments.length;
    repliesCmtRemaining = repliesCmtRemaining > 0 ? repliesCmtRemaining : 0;
    dispatch(
      setRepliesRemainingByCommentId({
        commentId: comment.id,
        repliesRemaining: repliesCmtRemaining,
      })
    );
    setShowAllReplies(repliesCmtRemaining == 0);
  };

  function handleHideReplies(): void {
    setShowAllReplies(false);
    dispatch(
      setCommentsRepliesByCommentId({
        commentId: comment.id,
        commentReplies: [],
      })
    );
    dispatch(
      setRepliesRemainingByCommentId({
        commentId: comment.id,
        repliesRemaining: comment.replies,
      })
    );
  }
  return (
    <div className="mt-3">
      <div className="replies-comment">
        {commentReplies.length > 0 &&
          commentReplies.map((reply) => (
            <Comment
              key={reply.id}
              isReplyComment={true}
              comment={reply}
              parentCommentId={comment.id}
              className="mb-2"
            />
          ))}
      </div>
      <div className="text-[14px] hover:opacity-80 hover:cursor-pointer text-[#0000007a] font-semibold  flex flex-nowrap gap-3">
        <div className="bg-[#0000007a] w-8 h-[1px] my-auto"></div>
        {!showAllReplies && (
          <span className=" my-auto flex" onClick={handleShowRepliesComment}>
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
            <IoChevronUp size={16} className="text-[#0000007a]  mt-auto ms-1" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ReplyCommnet;
