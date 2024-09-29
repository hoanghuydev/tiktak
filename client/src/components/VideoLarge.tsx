import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';
import { SlOptions } from 'react-icons/sl';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const VideoLarge = ({
  post,
  className,
}: {
  post: PostModel;
  className?: string;
}) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState({
    isPlaying: true,
    showIcon: false,
    progress: 0,
    duration: 0,
    isMuted: false,
    volume: 100,
  });
  const handleGoBack = () => {
    navigate(-1);
  };
  // Toggle mute/unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setVideoState((prev) => ({
      ...prev,
      isMuted: newMuted,
      volume: newMuted ? 0 : 100,
    }));
  };

  // Change volume and sync with video
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newVolume = parseFloat(e.target.value) / 100;
    videoRef.current.volume = newVolume;
    setVideoState((prev) => ({
      ...prev,
      volume: parseFloat(e.target.value),
      isMuted: newVolume === 0,
    }));
  };
  return (
    <div className={clsx('relative', className)}>
      {/* Blur background */}
      <img
        className="w-full absolute blur-lg opacity-40 inset-0 object-center mx-auto z-0"
        src={`https://drive.google.com/thumbnail?id=${post.thumnailId}&sz=w1000`}
        alt="Thumbnail post"
      />
      {/* Top control */}
      <div className="z-10">
        <div className="absolute left-3 right-3 top-4 flex justify-between gap-5">
          <div
            onClick={handleGoBack}
            className=" rounded-full my-auto grid place-items-center hover:cursor-pointer min-w-10 max-w-10 h-10 hover:opacity-85 bg-[#54545480]"
          >
            <IoMdClose className="text-white" />
          </div>
          <div className="flex-grow my-auto max-w-[60%]">
            <SearchForm isWhite placeHolder="Find related content" />
          </div>
          <div className=" rounded-full my-auto relative grid place-items-center hover:cursor-pointer min-w-10 max-w-10 h-10 hover:opacity-85 bg-[#54545480]">
            <SlOptions className="text-white" />
          </div>
        </div>
      </div>
      {/* End Top Control */}
      {/* Volumne */}
      <div className="flex flex absolute bottom-4 right-3">
        <div className="volume flex flex-col-reverse gap-2 items-center">
          {/* Mute/Unmute button */}
          <div className="mute-unmute-btn cursor-pointer " onClick={toggleMute}>
            {videoState.isMuted ? (
              <FiVolumeX size={24} className="text-white" />
            ) : (
              <FiVolume2 size={24} className="text-white" />
            )}
          </div>
          {/* Volume Slider */}
          <div
            className="p-2 rounded-pill rotate-[-90deg] mb-5 bg-black bg-opacity-30 rounded-3xl grid place-items-center"
            style={{ background: '#57575a0' }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={Math.max(0, Math.min(100, videoState.volume))}
              className="w-[50px] h-[4px] range-white cursor-pointer"
              onChange={handleVolumeChange} // Adjust volume when slider changes
            />
          </div>
        </div>
      </div>
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        className="object-cover object-center mx-auto z-0"
        src={post?.videoUrl ?? ''}
      ></video>
    </div>
  );
};

export default VideoLarge;
