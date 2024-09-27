import EmojiPicker from '@/components/EmoijPicker';
import { commentPost } from '@/features/comment/commentSlice';
import { setComments } from '@/features/post/postSlice';
import { PostModel } from '@/models/post';
import { AppDispatch } from '@/redux/store';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref } from 'yup';
interface CommentFormProps {
  post: PostModel;
  className?: string;
}
const CommentForm = forwardRef<HTMLDivElement, CommentFormProps>(
  ({ post, className }, ref) => {
    const [commentText, setCommentText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const commentInputRef = useRef<HTMLParagraphElement | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const maxCharacters = 150;
    useEffect(() => {
      if (isFocused) commentInputRef.current?.focus();
      else commentInputRef.current?.blur();
    }, [isFocused]);

    // Set selection in input to the last character
    const setCaretToEnd = (element: HTMLParagraphElement) => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false); // Set caret at the end
      selection?.removeAllRanges();
      selection?.addRange(range);
    };

    useEffect(() => {
      if (commentInputRef.current) {
        setCaretToEnd(commentInputRef.current);
      }
    }, [commentText]);
    const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (commentText.trim() && post) {
        dispatch(commentPost({ postId: post.id, content: commentText }));
        // Clear the content of the p tag
        if (commentInputRef.current) {
          commentInputRef.current.innerText = '';
        }
        dispatch(setComments((post.comments ?? 0) + 1));
        setCommentText('');
        setIsFocused(false);
      }
    };

    const handleInputChange = () => {
      if (commentInputRef.current) {
        let text = commentInputRef.current.innerText;
        if (text.length <= maxCharacters) {
          setCommentText(text);
        } else {
          // If it exceeds the limit, truncate the text and prevent further input
          const truncatedText = text.substring(0, maxCharacters);
          commentInputRef.current.innerText = truncatedText;
          setCaretToEnd(commentInputRef.current);
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
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
      <div
        ref={ref}
        className={` bg-white border-t-[2px] border-[#e9e9ea] shadow-sm  ${className}`}
      >
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
                  className="my-3 border-none min-w-[180px] flex-1 whitespace-pre-wrap select-text break-words break-all text-wrap outline-none h-fit max-h-[80px] overflow-y-auto bg-transparent text-[14px] text-[#161823bf]"
                >
                  {isFocused || commentText ? commentText : 'Add comment...'}
                </p>
                <EmojiPicker
                  inputRef={commentInputRef}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  maxCharacters={maxCharacters}
                />
              </div>
              {/* Display character count when commentText length > 24 */}
              {commentText.length > 24 && (
                <div
                  className={`text-[12px] mt-1 ${
                    commentText.length === maxCharacters
                      ? 'text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  {commentText.length}/{maxCharacters}
                </div>
              )}
            </div>
            <div className="my-auto">
              <button
                className={clsx(
                  'text-[#16182357] p-2 font-semibold',
                  commentText && 'text-primary'
                )}
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
);

export default CommentForm;
