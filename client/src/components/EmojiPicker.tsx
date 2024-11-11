import React, { useState, useEffect, useRef } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  inputRef: React.RefObject<HTMLParagraphElement>;
  maxCharacters: number;
  setText: (text: string) => void;
  text: string;
  isOpen?: boolean;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  inputRef,
  setText,
  text,
  maxCharacters,
  isOpen = false,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(isOpen);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const savedOffsets = useRef<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const updateSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount ?? 0 > 0) {
      const range = selection?.getRangeAt(0);
      if (
        inputRef.current &&
        inputRef.current.contains(range!.commonAncestorContainer)
      ) {
        savedOffsets.current = {
          start: range?.startOffset ?? 0,
          end: range?.endOffset ?? 0,
        };
      }
    }
  };

  const togglePicker = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsPickerOpen((prev) => {
      const selection = window.getSelection();
      if (selection && inputRef.current && inputRef.current.childNodes[0]) {
        const range = document.createRange();
        range.setStart(
          inputRef.current.childNodes[0],
          savedOffsets.current.start
        );
        range.setEnd(inputRef.current.childNodes[0], savedOffsets.current.end);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('mousedown', updateSelection);
      inputRef.current.addEventListener('keyup', updateSelection);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('mousedown', updateSelection);
        inputRef.current.removeEventListener('keyup', updateSelection);
      }
    };
  }, [inputRef]);

  const handlePickEmoji = (emoji: any) => {
    if (!inputRef.current || !savedOffsets.current) return;
    const { start, end } = savedOffsets.current;
    const textBeforeSelection = text.slice(0, start);
    const textAfterSelection = text.slice(end);

    if (
      textBeforeSelection.length +
        emoji.native.length +
        textAfterSelection.length <=
      maxCharacters
    ) {
      const newText = textBeforeSelection + emoji.native + textAfterSelection;
      inputRef.current.innerText = newText;
      setText(newText);
      // Set focus and update the cursor position right after the inserted emoji
      inputRef.current.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(
        inputRef.current.childNodes[0],
        start + emoji.native.length
      );
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);

      // Update saved offsets to reflect the new cursor position
      savedOffsets.current = {
        start: start + emoji.native.length,
        end: start + emoji.native.length,
      };
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pickerRef]);

  return (
    <div ref={pickerRef} className="select-none flex">
      <button
        type="button"
        onMouseDown={togglePicker}
        className="flex m-auto justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
      >
        <BsEmojiSmile size={16} />
      </button>
      {isPickerOpen && (
        <div className="absolute bottom-[100%] right-[0]">
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={handlePickEmoji}
            sty
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
