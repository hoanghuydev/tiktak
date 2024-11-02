import EmojiPicker from '@/components/EmojiPicker';
import {
  addComment,
  commentPost,
  replyComment,
} from '@/features/comment/commentSlice';
import { setCountCommnent } from '@/features/post/postSlice';
import { RootState } from '@/redux/reducer';
import {
  currentUserSelector,
  getCommentSelector,
  getPostSelector,
} from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { message } from 'antd';
import clsx from 'clsx';
import React, { forwardRef, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface CommentFormProps {
  parentCommentId?: number;
  className?: string;
}

const CommentForm = forwardRef<HTMLDivElement, CommentFormProps>(
  ({ className, parentCommentId }, ref) => {
    const { isSuccess } = useSelector((state: RootState) => state.comment);
    const post = useSelector(getPostSelector);
    const commentInputRef = useRef<HTMLParagraphElement | null>(null);
    const commentTextRef = useRef(''); // Use ref for commentText
    const dispatch = useDispatch<AppDispatch>();
    const maxCharacters = 150;
    const user = useSelector(currentUserSelector);
    const [isFocused, setIsFocused] = useState(false);

    const handleCommentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (commentTextRef.current.trim() && post) {
        // Check comment or reply comment
        if (parentCommentId) {
          const resp = await dispatch(
            replyComment({
              postId: post.id,
              parentCommentId,
              content: commentTextRef.current,
            })
          ).unwrap();
          if (isSuccess && resp) {
            dispatch(addComment({ parentCommentId, comment: resp.comment }));
          }
        } else {
          dispatch(
            commentPost({ postId: post.id, content: commentTextRef.current })
          );
        }
        if (commentInputRef.current) commentInputRef.current.innerText = '';
        dispatch(setCountCommnent((post.comments ?? 0) + 1));
        commentTextRef.current = ''; // Clear the ref value
        setIsFocused(false);
      }
    };

    const handleInputChange = () => {
      if (commentInputRef.current) {
        const text = commentInputRef.current.innerText;
        if (text.length <= maxCharacters) {
          commentTextRef.current = text; // Update the ref instead of state
        } else {
          const truncatedText = text.substring(0, maxCharacters);
          commentInputRef.current.innerText = truncatedText;
        }
      }
    };
    // Submit the comment
    const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommentSubmit(e as React.FormEvent);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div ref={ref} className={`bg-white ${className}`}>
        {!user && (
          <div className="my-3 mx-5 p-3 bg-[#f1f1f1]">
            <Link to={'/login'}>
              <p className="text-primary font-bold">Log in to comment</p>
            </Link>
          </div>
        )}
        {user && (
          <form method="POST" onSubmit={handleCommentSubmit}>
            <div className="flex py-3 px-5 md:py-5 md:px-8">
              <div className="bg-[#f1f1f2] flex-1 rounded-md px-2 flex-grow">
                <div className="flex gap-3 relative">
                  <p
                    ref={commentInputRef}
                    contentEditable
                    onInput={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    suppressContentEditableWarning={true}
                    className="py-3 border-none min-w-[180px] flex-1 whitespace-pre-wrap select-text break-words break-all text-wrap outline-none h-fit max-h-[80px] overflow-y-auto bg-transparent text-[14px] text-[#161823e2]"
                  >
                    {isFocused || commentTextRef.current
                      ? commentTextRef.current
                      : 'Add comment...'}
                  </p>
                  {/* <EmojiPicker
                    inputRef={commentInputRef}
                    setText={(text: string) => {
                      commentTextRef.current = text;
                    }}
                    maxCharacters={maxCharacters}
                  /> */}
                </div>
                {commentTextRef.current.length > 24 && (
                  <div
                    className={`text-[12px] mt-1 ${
                      commentTextRef.current.length === maxCharacters
                        ? 'text-primary'
                        : 'text-gray-500'
                    }`}
                  >
                    {commentTextRef.current.length}/{maxCharacters}
                  </div>
                )}
              </div>
              <div className="my-auto">
                <button
                  className={clsx(
                    'text-[#16182357] p-2 font-semibold',
                    commentTextRef.current && 'text-primary'
                  )}
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
);

export default CommentForm;
