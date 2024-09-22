import { CommentModel } from '@/models/comment';
import clsx from 'clsx';
import React, { useState } from 'react';
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
  comment: CommentModel;
  isReplyComment?: boolean;
  className?: string;
}) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [commentReplies, setCommentReplies] = useState<CommentModel[]>([]);
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
            src={comment.commenterData.avatarData.url ?? ''}
            alt="Avatar User"
          />
        </div>
        {/* End Commenter Avatar */}
        <div className="w-full">
          <p className="text-[14px] font-semibold">
            {comment.commenterData.fullName}
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
          {comment && comment.replies > 0 && (
            <div className="mt-3">
              <div></div>
              <div className="text-[14px] text-[#0000007a] font-semibold  flex flex-nowrap gap-3">
                <div className="bg-[#0000007a] w-8 h-[1px] my-auto"></div>
                {!showAllReplies && (
                  <span className=" my-auto flex">
                    <p className="whitespace-nowrap text-[#0000007a] leading-[1]">{` View ${comment.replies} replies`}</p>
                    <IoChevronDown
                      size={16}
                      className="text-[#0000007a]  my-auto ms-1"
                    />
                  </span>
                )}
                {showAllReplies && (
                  <span className="my-auto flex">
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
