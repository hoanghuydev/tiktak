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
import TextEdit from './components/EditVideo/TextEdit';
import VideoEditPreview from './components/EditVideo/VideoEditPreview';

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
    console.log(!postUpload?.video);
    if (!postUpload?.video) navigate('/upload');
  }, [postUpload?.video]);
  const tabItems = [
    {
      id: 'text',
      label: 'Text',
      icon: <PiTextAUnderline size={20} />,
      content: <TextEdit />,
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
    <div className="p-4 bg-[#f8f8f8] h-screen flex gap-10 flex-col">
      <div className="flex h-[60%] gap-8">
        <div className="flex h-full gap-3 flex-1">
          <Tab items={tabItems} tabItemVertical defaultActiveId="text" />
        </div>
        <div className="flex relative rounded-md justify-center overflow-hidden flex-1">
          <VideoEditPreview videoUrl={videoUrl} />
        </div>
      </div>
      <div className="h-[40%]">
        <TimelineEditor />
      </div>
    </div>
  );
};

export default EditVideo;
