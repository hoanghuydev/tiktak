import React, { useRef, useState, useEffect } from 'react';
import { FaPauseCircle, FaPlayCircle, FaVolumeMute } from 'react-icons/fa';
import clsx from 'clsx';
import { FaVolumeHigh } from 'react-icons/fa6';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

interface VideoProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string;
  className?: string;
}

const Video = ({ videoRef, videoUrl, className }: VideoProps) => {
  // Consolidate all states into one state object
  const [videoState, setVideoState] = useState({
    isPlaying: true,
    showIcon: false,
    progress: 0,
    duration: 0,
    isMuted: false,
    volume: 100,
  });

  // Toggle play/pause for the video
  const togglePlayPause = () => {
    if (!videoRef.current) return;

    const newIsPlaying = videoRef.current.paused ? true : false;
    if (newIsPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setVideoState((prev) => ({
      ...prev,
      isPlaying: newIsPlaying,
      showIcon: true,
    }));

    setTimeout(() => {
      setVideoState((prev) => ({
        ...prev,
        showIcon: false,
      }));
    }, 300);
  };

  // Update progress based on the current video time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    const videoDuration = videoRef.current.duration;
    setVideoState((prev) => ({
      ...prev,
      progress: (currentTime / videoDuration) * 100,
    }));
  };

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

  // Get video duration when metadata is loaded
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        setVideoState((prev) => ({
          ...prev,
          duration: videoElement.duration,
          volume: videoElement.volume * 100, // Set initial volume
        }));
      };
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        videoElement.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
      };
    }
  }, []);

  return (
    <div
      className={clsx(
        'video-container bg-black grid place-items-center rounded-lg overflow-hidden relative w-fit h-fit',
        className
      )}
      onClick={togglePlayPause}
    >
      {/* Video Controls */}
      <div className="video-controls z-20 absolute top-0 left-0 right-0 bottom-0">
        <div className="w-full h-full relative">
          <div className="video-controls-center h-full z-10 transition-opacity ease-in-out duration-150 opacity-0 hover:opacity-100">
            <div className="control-header bg-black-to-transparent absolute top-0 left-0 right-0 p-3 flex justify-between">
              {/* Volume Controls */}
              <div className="volume flex gap-2 items-center">
                {/* Mute/Unmute button */}
                <div
                  className="mute-unmute-btn cursor-pointer"
                  onClick={toggleMute}
                >
                  {videoState.isMuted ? (
                    <FiVolumeX size={24} className="text-white" />
                  ) : (
                    <FiVolume2 size={24} className="text-white" />
                  )}
                </div>
                {/* Volume Slider */}
                <div
                  className="p-2 rounded-pill bg-black bg-opacity-30 rounded-3xl grid place-items-center"
                  style={{ background: '#57575a0' }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={videoState.volume}
                    className="w-[50px] h-[4px] range-white cursor-pointer"
                    onChange={handleVolumeChange} // Adjust volume when slider changes
                  />
                </div>
              </div>
            </div>

            {/* Play/Pause Icon */}
            <div
              className={clsx(
                'play-pause-btn bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
                videoState.showIcon
                  ? 'scale-100 opacity-40'
                  : 'scale-0 opacity-0',
                'transition-transform transition-opacity duration-200 ease-in-out'
              )}
            >
              {videoState.isPlaying ? (
                <FaPauseCircle size={60} className="text-black" />
              ) : (
                <FaPlayCircle size={60} className="text-black" />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="time-duration z-20 absolute bottom-[7.4px] left-[-4px] right-[-4px] h-[10px]">
            <input
              type="range"
              min="0"
              max="100"
              value={videoState.progress}
              className="w-full range-primary h-1 bg-primary cursor-pointer"
              onChange={handleTimelineChange} // Adjust video progress when the slider changes
            />
          </div>
        </div>
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        autoPlay
        loop
        muted={videoState.isMuted} // Set video muted state
        onTimeUpdate={handleTimeUpdate} // Track video time
      >
        <source src={videoUrl || ''} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
