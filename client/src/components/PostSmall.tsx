import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const PostSmall = ({
  post,
  className,
  haveInfo,
}: {
  post: PostModel;
  className?: string;
  haveInfo?: boolean;
}) => {
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
      className={clsx(
        'hover:cursor-pointer hover:opacity-95 rounded-sm rounded-lg max-w-[370px] min-w-[140px] ',
        className
      )}
    >
      <div
        className="relative bg-black overflow-hidden"
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
              <span
                className={clsx(
                  'flex mb-[3px] ms-1 gap-1 text-white',
                  haveInfo && 'ms-4'
                )}
              >
                {!haveInfo && <IoPlayOutline size={18} className="my-auto" />}
                <p
                  className={clsx(
                    'my-auto text-white',
                    haveInfo && 'font-semibold'
                  )}
                >
                  {haveInfo
                    ? (post.createdAt! as string).slice(0, 10)
                    : post.views}
                </p>
              </span>
            </div>
          </Link>
        </div>
      </div>
      {haveInfo && (
        <div className="p-2">
          <p className="text-[16px] line-clamp-2">{post.title}</p>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <img
                className="min-w-6 max-w-6 h-6 rounded-full my-auto object-cover"
                src={post.posterData.avatarData.url ?? ''}
                alt="User Avatar"
              />
              <p className="text-[16px] line-clamp-1 my-auto max-w-[70px]">
                {post.posterData.userName}
              </p>
            </div>
            <div className="my-auto">
              <span className="flex gap-1">
                <IoPlayOutline size={18} className="my-auto" />
                <p className="my-auto">{post.views}</p>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostSmall;
