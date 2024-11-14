// src/components/EditVideo/TextEdit.tsx

import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addText } from '@/features/editVideo/editVideoSlice';
import { TextConfig, Position } from '@/models/videoEdit';
import { message } from 'antd';
import { fabric } from 'fabric';

const TextEdit = () => {
  const dispatch = useDispatch();

  const fonts = [
    {
      name: 'sans',
      link: 'https://fonts.cdnfonts.com/s/14884/OpenSans-Regular.woff',
    },
    {
      name: 'mono',
      link: 'https://fonts.cdnfonts.com/s/118389/GeistMono-Regular.woff',
    },
    {
      name: 'playfair',
      link: 'https://fonts.cdnfonts.com/s/15447/PlayfairDisplay-Regular.woff',
    },
    {
      name: 'kanit',
      link: 'https://fonts.cdnfonts.com/s/15799/Kanit-Regular.woff',
    },
    {
      name: 'dancing',
      link: 'https://fonts.cdnfonts.com/s/15416/DancingScript-Regular.woff',
    },
  ];
  const [textContent, setTextContent] = useState('');
  const [selectedFont, setSelectedFont] = useState('sans');
  const defaultPosition: Position = { x: 100, y: 100 };
  const defaultFontSize = 50;
  const defaultColor = '#FFFFFF';
  const defaultOpacity = 1;

  const handleAddText = (font: { name: string; link: string }) => {
    if (!textContent.trim()) {
      message.error('Please enter some text before adding.');
      return;
    }
    const newText: TextConfig = {
      id: Date.now(),
      content: textContent,
      position: defaultPosition,
      fontFamily: font.name,
      fontSize: defaultFontSize,
      color: defaultColor,
      opacity: defaultOpacity,
    };

    dispatch(addText(newText));
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
                setSelectedFont(font.name);
                handleAddText(font);
              }}
              className={clsx(
                'max-w-[120px] min-w-[90px] flex justify-center items-center rounded-[8px] aspect-square bg-[#c1c1c1] hover:bg-[#a1a1a1] transition-colors',
                selectedFont === font.name ? 'border-2 border-blue-500' : ''
              )}
            >
              <p
                className={clsx('text-white text-[20px]', `font-${font.name}`)}
              >
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
