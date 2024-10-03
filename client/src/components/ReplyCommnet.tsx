import React, { useState } from 'react';
import Comment from './Comment';
import CommentService from '@/features/comment/commentService';
import { CommentModel } from '@/models/comment';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const ReplyCommnet = ({
  comment,
  repliesRemaining,
  setRepliesRemaining,
  commentReplies,
  setCommentReplies,
}: {
  comment: CommentModel;
  repliesRemaining: number;
  setRepliesRemaining: React.Dispatch<React.SetStateAction<number>>;
  commentReplies: CommentModel[];
  setCommentReplies: React.Dispatch<React.SetStateAction<CommentModel[]>>;
}) => {
  console.log(commentReplies);

  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const handleShowRepliesComment = async (): Promise<void> => {
    const resp = await CommentService.getRepliesCommentByCommentId(comment.id!);
    setCommentReplies(resp.comments);
    let repliesCmtRemaining = repliesRemaining - resp.comments.length;
    repliesCmtRemaining = repliesCmtRemaining > 0 ? repliesCmtRemaining : 0;
    setRepliesRemaining(repliesCmtRemaining);
    setShowAllReplies(repliesCmtRemaining == 0);
  };

  function handleHideReplies(): void {
    setShowAllReplies(false);
    setCommentReplies([]);
    setRepliesRemaining(comment.replies);
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
