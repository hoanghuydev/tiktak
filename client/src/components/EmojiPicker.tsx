import React, { useState, useEffect, useRef } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  inputRef: React.RefObject<HTMLParagraphElement>;

  commentText: string;
  maxCharacters: number;
  setCommentText: (text: string) => void;
  isOpen?: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  inputRef,
  commentText,
  setCommentText,
  maxCharacters,
  isOpen = false,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(isOpen);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handlePickEmoji = (emoji: any) => {
    if (
      commentText.length <= maxCharacters - emoji.native.length &&
      inputRef.current
    ) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      console.log(range);

      if (range) {
        range.deleteContents(); // Remove any selected text
        const emojiNode = document.createTextNode(emoji.native);
        range.insertNode(emojiNode);

        // Move the caret after the inserted emoji
        const newRange = document.createRange();
        newRange.setStartAfter(emojiNode);
        newRange.setEndAfter(emojiNode);
        selection?.removeAllRanges();
        selection?.addRange(newRange);
        // Update the commentText
      } else {
        inputRef.current.innerText += emoji.native;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <div>
      <button
        type="button"
        onClick={togglePicker}
        className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
      >
        <BsEmojiSmile size={20} />
      </button>
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute bottom-[100%] right-[-20%]">
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={handlePickEmoji}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
