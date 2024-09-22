import React, { useState } from 'react';
import { IoHeart, IoChatbubbleEllipses } from 'react-icons/io5';
import { FaCheck, FaPlus, FaShare } from 'react-icons/fa6';
import ButtonActionPost from './ButtonActionPost';
import { PostModel } from '@/models/post';
import { Link, useNavigate } from 'react-router-dom';
import { VideoRecommendChildProps } from '.';
import { clientURL } from '@/axios';
import showToast from '@/utils/toast';
import useDebounce from '@/hooks/useDebounce';
import PostService from '@/features/post/postService';
import AbstractPayload from '@/utils/abtractPayloadType';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import { message } from 'antd';
import { PostActions } from '@/utils/postActions';
const VideoRecommendActions = ({
  post,
  isFollow,
  setIsFollow,
  followUser,
}: VideoRecommendChildProps) => {
  const navigate = useNavigate();
  const user = useSelector(currentUserSelector);
  const [shares, setShares] = useState<number>(post.shares!);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked!);
  const [likes, setLikes] = useState<number>(post.likes!);

  return (
    <div className="ms-5 flex flex-col justify-end h-full">
      {!post.isMe ? (
        <div className="mb-3 relative min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12 rounded-full object-cover">
          <Link to={`/profile/@${post.posterData.userName}`}>
            <img
              src={post.posterData.avatarData.url || ''}
              alt="User avatar"
              className="h-full w-full rounded-full oject-cover"
            />
          </Link>
          <div
            onClick={() => {
              user ? followUser() : navigate('/login');
            }}
            className={clsx(
              'absolute hover:cursor-pointer transition-all top-[100%] flex rounded-full min-w-6 max-w-6 h-6 translate-x-[-50%]  border-[1px]  translate-y-[-50%] bg- start-1/2',
              isFollow
                ? 'border-gray-200 bg-white'
                : 'border-[#f42750] bg-primary'
            )}
          >
            {isFollow ? (
              <FaCheck
                fontSize={16}
                className="text-primary m-auto text-center"
              />
            ) : (
              <FaPlus fontSize={16} className="text-white m-auto text-center" />
            )}
          </div>
        </div>
      ) : (
        ''
      )}
      <ButtonActionPost
        iconClassName="min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12"
        onClick={() => {
          user
            ? PostActions.likePost(post!.id!, isLiked, setLikes, setIsLiked)
            : navigate('/login');
        }}
        className="mt-3 flex-col"
        icon={
          <IoHeart
            fontSize={25}
            className={clsx(
              'm-auto active:scale-125  transition-all',
              isLiked && 'text-primary'
            )}
          />
        }
        count={likes}
        postId={post.id!}
      />
      <ButtonActionPost
        iconClassName="min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12"
        onClick={() => {
          navigate('/post/' + post.id);
        }}
        className="mt-3  flex-col"
        icon={<IoChatbubbleEllipses fontSize={25} className="m-auto" />}
        count={post.comments!}
        postId={post.id!}
      />
      <ButtonActionPost
        iconClassName="min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12"
        onClick={() => {
          user
            ? PostActions.sharePost(post!.id!, setShares)
            : navigate('/login');
        }}
        className="mt-3  flex-col"
        icon={
          <FaShare
            fontSize={25}
            className="m-auto active:scale-125  transition-all"
          />
        }
        count={shares}
        postId={post.id!}
      />
    </div>
  );
};

export default VideoRecommendActions;
