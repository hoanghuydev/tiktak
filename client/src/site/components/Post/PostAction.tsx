import { PostModel } from '@/models/post';
import { currentUserSelector, getPostSelector } from '@/redux/selector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonActionPost from '../VideoRecommend/ButtonActionPost';
import { PostActions } from '@/utils/postActions';
import { AppDispatch } from '@/redux/store';
import {
  setCountLike,
  setCountShare,
  setIsLike,
} from '@/features/post/postSlice';
import clsx from 'clsx';
import { IoChatbubbleEllipses, IoHeart } from 'react-icons/io5';
import { FaShare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PostAction = () => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const post = useSelector(getPostSelector);
  const dispatch = useDispatch<AppDispatch>();

  const handleLikePost = () => {
    if (user) {
      PostActions.likePost(
        post!.id!,
        post.isLiked ?? false,
        (newLikes: any) => {
          dispatch(
            setCountLike(
              post.isLiked ? (post.likes ?? 0) - 1 : (post.likes ?? 0) + 1
            )
          );
        },
        (newIsLiked: any) => {
          dispatch(setIsLike(!post.isLiked));
        }
      );
    } else {
      navigate('/login');
    }
  };

  const handleSharePost = () => {
    if (user) {
      PostActions.sharePost(post!.id!, (newShares: any) => {
        dispatch(setCountShare((post.shares ?? 0) + 1));
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex gap-6">
      <ButtonActionPost
        iconClassName="min-w-8 mx-auto max-w-8 h-8"
        textClassName="my-auto"
        onClick={handleLikePost}
        className="mt-3 flex-row gap-2"
        icon={
          <IoHeart
            fontSize={18}
            className={clsx(
              'm-auto active:scale-125 transition-all',
              post.isLiked ? 'text-primary' : ''
            )}
          />
        }
        count={post.likes ?? 0}
        postId={post.id!}
      />
      <ButtonActionPost
        iconClassName="min-w-8 mx-auto max-w-8 h-8"
        onClick={() => {
          navigate('/post/' + post.id);
        }}
        textClassName="my-auto"
        className="mt-3 flex-row gap-2"
        icon={<IoChatbubbleEllipses fontSize={18} className="m-auto" />}
        count={post.comments!}
        postId={post.id!}
      />
      <ButtonActionPost
        iconClassName="min-w-8 mx-auto max-w-8 h-8"
        onClick={handleSharePost}
        textClassName="my-auto"
        className="mt-3 flex-row gap-2"
        icon={
          <FaShare
            fontSize={18}
            className="m-auto active:scale-125 transition-all"
          />
        }
        count={post.shares ?? 0}
        postId={post.id!}
      />
    </div>
  );
};

export default PostAction;
