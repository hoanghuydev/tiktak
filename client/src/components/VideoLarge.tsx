import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import SearchForm from './SearchForm';
import { useNavigate } from 'react-router-dom';
import { SlOptions } from 'react-icons/sl';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa6';

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
    currentTime: 0,
  });

  // Format seconds to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    const newIsPlaying = videoRef.current.paused ? true : false;
    if (newIsPlaying) {
      videoRef.current.play();
      setVideoState((prev) => ({
        ...prev,
        isPlaying: newIsPlaying,
        showIcon: false,
      }));
    } else {
      videoRef.current.pause();
      setVideoState((prev) => ({
        ...prev,
        isPlaying: newIsPlaying,
        showIcon: true,
      }));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const videoDuration = videoRef.current.duration || 1;
    setVideoState((prev) => ({
      ...prev,
      currentTime: currentTime,
      progress: (currentTime / videoDuration) * 100 || 0,
    }));
  };

  useEffect(() => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setVideoState((prev) => ({
        ...prev,
        duration: videoDuration,
      }));
    }
  }, [videoRef.current?.duration]);

  // Update video currentTime when timeline slider changes
  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime =
      (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setVideoState((prev) => ({
      ...prev,
      progress: parseFloat(e.target.value),
    }));
  };

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
    <div className={clsx('relative video-container', className)}>
      {/* Blur background */}
      <img
        className="w-full absolute blur-lg opacity-40 inset-0 object-center mx-auto z-0"
        src={`https://drive.google.com/thumbnail?id=${post.thumnailId}&sz=w1000`}
        alt="Thumbnail post"
      />
      {/* Top control */}
      <div className="z-20">
        <div className="absolute left-3 right-3 top-4 flex justify-between gap-5">
          <div
            onClick={handleGoBack}
            className=" rounded-full my-auto grid place-items-center hover:cursor-pointer min-w-10 max-w-10 h-10 hover:opacity-85 bg-[#54545480]"
          >
            <IoMdClose className="text-white" />
          </div>
          <div className="flex-grow my-auto max-w-[60%] hidden md:flex">
            <SearchForm isWhite placeHolder="Find related content" />
          </div>
          <div className=" rounded-full my-auto relative grid place-items-center hover:cursor-pointer min-w-10 max-w-10 h-10 hover:opacity-85 bg-[#54545480]">
            <SlOptions className="text-white" />
          </div>
        </div>
      </div>
      {/* End Top Control */}
      {/* Progress bar timeline */}
      <div className="time-duration control-header opacity-0 z-20 flex gap-3 absolute bottom-4 w-[50%] left-1/2 translate-x-[-50%]">
        <div className="h-fit my-auto w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={Math.max(0, Math.min(100, videoState.progress))}
            className="w-full range-white border-none outline-none h-1 bg-primary cursor-pointer"
            onChange={handleTimelineChange} // Adjust video progress when the slider changes
          />
        </div>
        <p className="text-[12px] mt-2 text-white">
          {formatTime(videoState.currentTime) +
            '/' +
            formatTime(videoState.duration)}
        </p>
      </div>
      {/* Volumne */}
      <div className="control-header opacity-0 flex absolute bottom-4 z-20 justify-between right-3">
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
        onTimeUpdate={handleTimeUpdate} // Track video time
        muted={videoState.isMuted} // Set video muted state
      ></video>
      {/* Play and pause video */}
      <div
        className="absolute z-10 inset-0 grid place-items-center"
        onClick={togglePlayPause}
      >
        <div
          className={clsx(
            'play-pause-btn  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
            videoState.showIcon ? 'scale-100 opacity-95' : 'scale-0 opacity-0',
            'transition-transform transition-opacity duration-200 ease-in-out'
          )}
        >
          {!videoState.isPlaying && <FaPlay size={60} className="text-white" />}
        </div>
      </div>
    </div>
  );
};

export default VideoLarge;
