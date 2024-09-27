import React, { useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  inputRef: React.RefObject<HTMLParagraphElement>;
  commentText: string;
  maxCharacters: number;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
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

  // This function is triggered when an emoji is selected from the emoji picker
  const handlePickEmoji = (emoji: any) => {
    if (commentText.length <= maxCharacters - emoji.native.length)
      setCommentText((prev) => prev + emoji.native);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
      >
        <BsEmojiSmile size={20} />
      </button>
      {isPickerOpen && (
        <div className="absolute bottom-[100%] right-[-20%]">
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
