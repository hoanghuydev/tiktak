import React from 'react';
import Button from '@/components/Button';
import { RiScissors2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

interface VideoPreviewUploadProps {
  videoUrl: string;
}

const VideoPreviewUpload: React.FC<VideoPreviewUploadProps> = ({
  videoUrl,
}) => {
  return (
    <div className="ms-0 md:ms-10">
      <p className="font-bold mb-5">Preview</p>
      <div className="relative border-[6px] border-[#202020] min-w-[200px] aspect-[9/18] bg-[#000000] rounded-[43px] flex justify-center items-center">
        <video
          controls
          preload="auto"
          className="h-[300px] md:h-[unset] md:w-[200px] lg:w-[300px] rounded-md"
          src={videoUrl}
        ></video>
      </div>
      <div className="w-[150px]   mx-auto">
        <Link to={'/video/edit'}>
          <Button
            bgGray
            secondary
            className="p-[4px] mt-4 min-w-[108px] flex gap-2"
          >
            <RiScissors2Line size={16} className="my-auto" />
            <p className="text-[14px] font-semibold">Edit video</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VideoPreviewUpload;
