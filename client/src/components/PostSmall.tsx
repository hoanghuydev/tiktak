import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const PostSmall = ({ post }: { post: PostModel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [errorThumbnail, setErrorThumbnail] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play(); // Ensure the video plays on hover
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video when unhovered
    }
  };

  return (
    <div
      className="hover:cursor-pointer hover:opacity-95 rounded-sm rounded-lg bg-black overflow-hidden max-w-[370px] min-w-[150px] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pt-[132%]">
        <Link to={`/post/${post.id}`}>
          <div className="absolute inset-0">
            {/* Video: Display only on hover */}
            <video
              ref={videoRef}
              loop
              controls={false}
              muted
              src={post.videoUrl ?? ''}
              className={clsx(
                'w-full h-full object-cover transition-opacity duration-300',
                isHovered
                  ? 'block opacity-1'
                  : errorThumbnail
                  ? 'block'
                  : 'hidden opacity-5'
              )}
            ></video>

            <img
              src={`https://drive.google.com/thumbnail?id=${post.thumnailId}&sz=w1000`}
              alt="Image Description"
              className={clsx(
                'w-full h-full object-cover object-center',
                errorThumbnail && 'hidden'
              )}
              onError={(e) => {
                setErrorThumbnail(true);
                e.currentTarget.classList.add('hidden');
                e.currentTarget.alt = 'Fallback Image';
              }}
            />
          </div>
          <div className="absolute flex flex-col-reverse bottom-0 w-full h-[60px] black-to-transparent-bottom">
            <span className="flex mb-[3px] ms-1 gap-1 text-white">
              <IoPlayOutline size={18} className="my-auto" />
              <p className="my-auto text-white"> {post.views}</p>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostSmall;
