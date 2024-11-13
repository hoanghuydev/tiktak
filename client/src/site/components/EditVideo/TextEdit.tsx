// src/components/EditVideo/TextEdit.tsx

import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addText } from '@/features/editVideo/editVideoSlice';
import { TextConfig, Position } from '@/models/videoEdit';

const TextEdit = () => {
  const dispatch = useDispatch();

  // Available fonts
  const [fonts] = useState<
    ('sans' | 'mono' | 'playfair' | 'kanit' | 'dancing')[]
  >(['sans', 'mono', 'playfair', 'kanit', 'dancing']);

  // Local state for text input
  const [textContent, setTextContent] = useState('');
  const [selectedFont, setSelectedFont] = useState<
    'sans' | 'mono' | 'playfair' | 'kanit' | 'dancing'
  >('sans');

  // Optional: Default position, size, color, etc.
  const defaultPosition: Position = { x: '50%', y: '50%' };
  const defaultFontSize = 50;
  const defaultColor = '#FFFFFF';
  const defaultOpacity = 1;

  const handleAddText = (
    font: 'sans' | 'mono' | 'playfair' | 'kanit' | 'dancing'
  ) => {
    if (!textContent.trim()) {
      alert('Please enter some text before adding.');
      return;
    }

    const newText: TextConfig = {
      id: Date.now(), // Simple unique ID
      content: textContent,
      position: defaultPosition,
      fontFamily: font,
      fontSize: defaultFontSize,
      color: defaultColor,
      opacity: defaultOpacity,
      // You can add more properties or allow user to set them
    };

    dispatch(addText(newText));

    // Reset text input
    setTextContent('');
  };

  return (
    <div className="p-4 h-full overflow-auto ">
      <div className="mb-4 ">
        <input
          type="text"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your text here"
        />
      </div>
      <div>
        <label className="block mb-2">Select Font:</label>
        <div className="grid gap-x-3 gap-y-2 grid-cols-[repeat(auto-fit,_minmax(100px,_1fr))]">
          {fonts.map((font, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedFont(font);
                handleAddText(font);
              }}
              className={clsx(
                'max-w-[120px] min-w-[90px] flex justify-center items-center rounded-[8px] aspect-square bg-[#c1c1c1] hover:bg-[#a1a1a1] transition-colors',
                selectedFont === font ? 'border-2 border-blue-500' : ''
              )}
            >
              <p className={clsx('text-white text-[20px]', `font-${font}`)}>
                Abc
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextEdit;
