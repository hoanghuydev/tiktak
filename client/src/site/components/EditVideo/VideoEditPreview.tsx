import React, { useEffect, useRef } from 'react';
import CanvasEdit from './CanvasEdit';
interface VideoEditPreviewProps {
  videoUrl: string;
}

const VideoEditPreview: React.FC<VideoEditPreviewProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative flex w-full h-full">
      <div className="flex-1 z-30 bg-[#f8f8f8]"></div>
      <div className="bg-black h-full relative aspect-[9/16]">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full z-0 h-full shadow-md "
          controls={false}
          autoPlay
          muted
        ></video>
        <div className="absolute z-10 inset-0 overflow-hidden h-full mx-auto aspect-[9/16]">
          <CanvasEdit videoRef={videoRef} />
        </div>
      </div>
      <div className="flex-1 z-30 bg-[#f8f8f8]"></div>
    </div>
  );
};

export default VideoEditPreview;
