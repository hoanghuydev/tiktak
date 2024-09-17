import React, { useState } from 'react';
import { IoHeart, IoChatbubbleEllipses } from 'react-icons/io5';
import { FaCheck, FaPlus, FaShare } from 'react-icons/fa6';
import ButtonActionPost from './ButtonActionPost';
import { PostModel } from '@/models/post';
import { useNavigate } from 'react-router-dom';
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
  const shareVideo = () => {
    navigator.clipboard
      .writeText(clientURL + 'post/' + post.id)
      .then(async () => {
        try {
          const resp: AbstractPayload = await PostService.sharePost(post.id!);
          setShares(shares + 1);
          message.success('Copied link to clipboard');
        } catch (error) {
          message.success('Copied link to clipboard');
        }
      })
      .catch(() => {
        message.error("Can't share video");
      });
  };
  const likePost = async () => {
    if (!isLiked) {
      await PostService.likePost(post.id!)
        .then(() => {
          setLikes(likes + 1);
          setIsLiked(true);
        })
        .catch((err) => {
          message.error(err.response.data.mes);
        });
    } else {
      await PostService.unlikePost(post.id!)
        .then(() => {
          setIsLiked(false);
          setLikes(likes - 1);
        })
        .catch((err) => {
          message.error(err.response.data.mes);
        });
    }
  };
  return (
    <div className="ms-5 flex flex-col justify-end">
      {!post.isMe ? (
        <div className="mb-3 relative min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12 rounded-full object-cover">
          <img
            src={post.posterData.avatarData.url || ''}
            alt="User avatar"
            className="h-full w-full rounded-full oject-cover"
          />
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
        onClick={() => {
          user ? likePost() : navigate('/login');
        }}
        className="mt-3"
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
        onClick={() => {
          navigate('/post/' + post.id);
        }}
        className="mt-3"
        icon={<IoChatbubbleEllipses fontSize={25} className="m-auto" />}
        count={post.comments!}
        postId={post.id!}
      />
      <ButtonActionPost
        onClick={() => {
          user ? shareVideo() : navigate('/login');
        }}
        className="mt-3"
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
