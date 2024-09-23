import Button from '@/components/Button';
import { PostModel } from '@/models/post';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import ButtonActionPost from '../VideoRecommend/ButtonActionPost';
import { IoChatbubbleEllipses, IoHeart } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { currentUserSelector, getPostSelector } from '@/redux/selector';
import { FaShare } from 'react-icons/fa6';
import PostAction from './PostAction';
import { clientURL } from '@/axios';
import { message } from 'antd';

const PostInfo = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const user = useSelector(currentUserSelector);
  const post = useSelector(getPostSelector);
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
  function handleCopyLink(): void {
    navigator.clipboard
      .writeText(`${clientURL}post/${post.id}`)
      .then(async () => {
        message.info('Copied link to clipboard');
      });
  }

  return (
    <div className="p-2 md:p-5">
      <div className="rounded-lg flex flex-col gap-3 bg-[#16182308] p-2">
        {/* User info */}
        <div className="flex justify-between flex-wrap gap-3">
          <div className="creator-info flex gap-3">
            <div className="avatar my-auto min-w-10 max-w-10 h-10">
              <img
                src={post.posterData.avatarData.url ?? ''}
                className="rounded-full w-full h-full object-cover object-center"
                alt="Avatar user"
              />
            </div>
            <div className="my-auto">
              <p className="font-bold text-[18px] line-clamp-1">
                {post.posterData.userName}
              </p>
              <p className="text-[14px] line-clamp-1">
                {post.posterData.fullName}
              </p>
            </div>
          </div>
          <Button
            className="px-6 py-2 h-fit rounded-sm"
            style={{ width: '80px' }}
          >
            Follow
          </Button>
        </div>
        {/* Video Title */}
        <div>
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
      </div>
      <div className="flex gap-5">
        <PostAction />
      </div>
      <div className="flex mt-2 text-[#161823bf] justify-between bg-[#1618230f] border-[#1618231f] rounded-md border-[1px]">
        <p className="bg-[#1618230f] w-full ps-3 pb-1 pt-2 line-clamp-1">{`${clientURL}post/${post.id}`}</p>
        <button
          className=" py-2 px-4 text-[#161823] font-bold whitespace-nowrap"
          onClick={handleCopyLink}
        >
          Copy link
        </button>
      </div>
    </div>
  );
};

export default PostInfo;
