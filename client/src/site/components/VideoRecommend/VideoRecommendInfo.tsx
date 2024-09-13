import Button from '@/components/Button';
import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { VideoRecommendChildProps } from '.';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';

const VideoRecommendInfo = ({
  post,
  isFollow,
  isFriend,
  setIsFollow,
  followUser,
}: VideoRecommendChildProps) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  useEffect(() => {
    if (titleRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(titleRef.current).lineHeight,
        10
      );
      const lines = titleRef.current.offsetHeight / lineHeight;
      if (lines > 1) {
        setIsTitleOverflowing(true);
      }
    }
  }, [post.title]);
  return (
    <div className="flex justify-between flex-wrap md:flex-nowrap">
      <div>
        <div className="flex gap-2">
          <Link
            to={'/user/' + post.posterData.userName}
            className="hidden md:block hover:underline text-[18px] font-bold"
          >
            {post.posterData.userName}
          </Link>
          <Link
            to={'/user/' + post.posterData.userName}
            className="block md:hidden hover:underline text-[18px] font-bold"
          >
            {post.posterData.fullName}
          </Link>
          <p className="text-[14px] my-auto hidden md:block">
            {post.posterData.fullName}
          </p>
        </div>
        <p
          ref={titleRef}
          className={clsx(
            `
              text-[16px]
              font-normal
            `,
            showMore ? '' : 'line-clamp-2'
          )}
        >
          {post.title}
        </p>
        {isTitleOverflowing && !showMore && (
          <button
            className="text-blue-500 font-semibold text-[14px]"
            onClick={() => setShowMore(true)}
          >
            More
          </button>
        )}
        {isTitleOverflowing && showMore && (
          <button
            className="text-blue-500 font-semibold text-[14px]"
            onClick={() => setShowMore(false)}
          >
            Less
          </button>
        )}
      </div>
      {!post.isMe ? (
        <Button
          outline
          setWidth
          onClick={() => {
            user ? followUser() : navigate('/login');
          }}
          className="h-fit min-w-[90px] max-w-[90px] px-1 py-2 mt-4 sm:mt-0"
        >
          {isFollow ? (isFriend ? 'Friend' : 'Following') : 'Follow'}
        </Button>
      ) : (
        ''
      )}
    </div>
  );
};

export default VideoRecommendInfo;
