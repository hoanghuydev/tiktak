import React, { useRef, useState } from 'react';
import EmojiPicker from '@/components/EmojiPicker';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ImageInput from './ImageInput';
interface InputFormEditableProps {
  placeholder: string;
  maxCharacters: number;
  maxCharToShowCountText: number;
  handleSubmit: (text: string) => void;
  handleSubmitImage?: (imageUrl: string) => void;
  className?: string;
  hasImage?: boolean;
}

const InputFormEditable: React.FC<InputFormEditableProps> = ({
  placeholder,
  maxCharacters,
  maxCharToShowCountText,
  handleSubmit,
  className,
  hasImage,
}) => {
  const user = useSelector(currentUserSelector);
  const inputRef = useRef<HTMLParagraphElement | null>(null);
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      handleSubmit(text);
      if (inputRef.current) inputRef.current.innerText = '';
      setText('');
      setIsFocused(false);
    }
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      const currentText = inputRef.current.innerText.trim();
      if (currentText.length <= maxCharacters) {
        setText(currentText);
      } else {
        const truncatedText = currentText.substring(0, maxCharacters);
        inputRef.current.innerText = truncatedText;
        setText(truncatedText);
      }
      console.log(currentText);
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
          <div className="flex py-3 px-5 flex-nowrap">
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
                  {isFocused || (!text && placeholder)}
                </p>
                {hasImage && <ImageInput />}
                <EmojiPicker
                  inputRef={inputRef}
                  setText={setText}
                  text={text}
                  maxCharacters={maxCharacters}
                />
              </div>
              {text.length > maxCharToShowCountText && (
                <div
                  className={`text-[12px] mt-1 ${
                    text.length === maxCharacters
                      ? 'text-primary'
                      : 'text-gray-500'
                  }`}
                >
                  {text.length}/{maxCharacters}
                </div>
              )}
            </div>
            <div className="my-auto min-w-[47px]">
              <button
                className={clsx(
                  'p-2 font-semibold',
                  text.length > 0 && 'text-primary',
                  text.length == 0 && 'text-[#16182357]'
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
};

export default InputFormEditable;
