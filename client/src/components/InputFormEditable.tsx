import React, { useRef, useState } from 'react';
import EmojiPicker from '@/components/EmojiPicker';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import { Link } from 'react-router-dom';

interface InputFormEditableProps {
  placeholder: string;
  maxCharacters: number;
  handleSubmit: (text: string) => void;
  className?: string;
}

const InputFormEditable: React.FC<InputFormEditableProps> = ({
  placeholder,
  maxCharacters,
  handleSubmit,
  className,
}) => {
  const user = useSelector(currentUserSelector);
  const inputRef = useRef<HTMLParagraphElement | null>(null);
  const textRef = useRef('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textRef.current.trim()) {
      handleSubmit(textRef.current);
      if (inputRef.current) inputRef.current.innerText = '';
      textRef.current = '';
      setIsFocused(false);
    }
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      const text = inputRef.current.innerText;
      if (text.length <= maxCharacters) {
        textRef.current = text;
      } else {
        const truncatedText = text.substring(0, maxCharacters);
        inputRef.current.innerText = truncatedText;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputSubmit(e as React.FormEvent);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`bg-white ${className}`}>
      {!user && (
        <div className="my-3 mx-5 p-3 bg-[#f1f1f1]">
          <Link to={'/login'}>
            <p className="text-primary font-bold">Log in to comment</p>
          </Link>
        </div>
      )}
      {user && (
        <form method="POST" onSubmit={handleInputSubmit}>
          <div className="flex py-3 px-5 md:py-5 md:px-8">
            <div className="bg-[#f1f1f2] flex-1 rounded-md px-2 flex-grow">
              <div className="flex gap-3 relative">
                <p
                  ref={inputRef}
                  contentEditable
                  onInput={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  suppressContentEditableWarning={true}
                  className="py-3 border-none min-w-[180px] flex-1 whitespace-pre-wrap select-text break-words break-all text-wrap outline-none h-fit max-h-[80px] overflow-y-auto bg-transparent text-[14px] text-[#161823e2]"
                >
                  {isFocused || textRef.current ? textRef.current : placeholder}
                </p>
                <EmojiPicker
                  inputRef={inputRef}
                  setCommentText={(text: string) => {
                    textRef.current = text;
                  }}
                  maxCharacters={maxCharacters}
                />
              </div>
              {textRef.current.length > 0 && (
                <div
                  className={`text-[12px] mt-1 ${
                    textRef.current.length === maxCharacters
                      ? 'text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  {textRef.current.length}/{maxCharacters}
                </div>
              )}
            </div>
            <div className="my-auto">
              <button
                className="text-[#16182357] p-2 font-semibold"
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
};

export default InputFormEditable;
