import Button from '@/components/Button';
import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';
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
  const widthTitlePost = 300;
  const titleRef = useRef<HTMLParagraphElement>(null);
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);
  useLayoutEffect(() => {
    if (titleRef.current) {
      const element = titleRef.current;
      const contentWidth = element.scrollWidth;
      if (contentWidth >= widthTitlePost) {
        setIsTitleOverflowing(true);
      } else {
        setIsTitleOverflowing(false);
      }
    }
  }, [post.title]);
  return (
    <div className="hidden gap-3 h-fit md:flex justify-between flex-wrap md:flex-nowrap">
      <div>
        <div className="flex gap-2">
          <Link
            to={'/profile/@' + post.posterData.userName}
            className="hidden md:block hover:underline md:text-[16px] lg:text-[18px] max-w-[150px] line-clamp-1 font-bold"
          >
            {post.posterData.userName}
          </Link>
          <Link
            to={'/user/' + post.posterData.userName}
            className="block md:hidden hover:underline md:text-[16px] lg:text-[18px] max-w-[100px] line-clamp-1 font-bold"
          >
            {post.posterData.fullName}
          </Link>
          <p className="my-auto md:text-[14px] lg:text-[16px] max-w-[100px]  line-clamp-1 whitespace-nowrap hidden md:block">
            {post.posterData.fullName}
          </p>
        </div>
        <div ref={titleRef} className={clsx('flex', showMore && 'flex-col')}>
          <p
            className={clsx(
              `
              text-[16px]
              font-normal
              w-fit
              max-w-[${widthTitlePost}px]
            `,
              showMore ? '' : 'line-clamp-1'
            )}
          >
            {post.title}
          </p>
          <span>
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
          </span>
        </div>
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
