import Tab from '@/components/Tab/Tab';
import TimelineEditor from '@/components/TimelineEditor';
import { postUploadSelector } from '@/redux/selector';
import React, { useEffect, useState } from 'react';
import { PiTextAUnderline } from 'react-icons/pi';
import {
  RiArrowRightSLine,
  RiFilter2Fill,
  RiImageEditFill,
  RiSoundModuleFill,
} from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditVideo = () => {
  const postUpload = useSelector(postUploadSelector);
  const video = postUpload?.video;
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>('');
  useEffect(() => {
    if (video && video.originFileObj) {
      const url = URL.createObjectURL(video.originFileObj);
      setVideoUrl(url);
    }
  }, [video]);
  useEffect(() => {
    if (!postUpload?.video) navigate('/video/edit');
  }, []);
  const tabItems = [
    {
      id: 'text',
      label: 'Text',
      icon: <PiTextAUnderline size={20} />,
      content: <div>Add text to your video here</div>,
    },
    {
      id: 'overlay',
      label: 'Overlay',
      icon: <RiImageEditFill size={20} />,
      content: <div>Overlay content settings here</div>,
    },
    {
      id: 'filter',
      label: 'Filter',
      icon: <RiFilter2Fill size={20} />,
      content: <div>Apply filters to your video here</div>,
    },
    {
      id: 'audio',
      label: 'Audio',
      icon: <RiSoundModuleFill size={20} />,
      content: <div>Audio settings for your video</div>,
    },
    {
      id: 'transition',
      label: 'Transition',
      icon: <RiArrowRightSLine size={20} />,
      content: <div>Video transition effects here</div>,
    },
  ];

  return (
    <div className="p-8 bg-[#f8f8f8] h-screen flex flex-col">
      <div className="flex h-[40%] gap-8">
        <div className="flex h-full gap-3 flex-1">
          <Tab items={tabItems} tabItemVertical defaultActiveId="text" />
        </div>
        <div className="flex relative rounded-md overflow-hidden flex-1">
          <video controls src={videoUrl} className="w-full h-full"></video>
        </div>
      </div>
      <div className="flex-1">
        <TimelineEditor />
      </div>
    </div>
  );
};

export default EditVideo;
