import PostService, { PostsPayload } from '@features/post/postService.ts';
import { PostModel } from '@/models/post.ts';
import React, { useEffect, useState } from 'react';
import VideoRecommend from '../components/VideoRecommend';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, postSliceSelector } from '@/redux/selector.ts';
import { AppDispatch } from '@/redux/store.ts';
import { getFriendPosts, setPosts } from '@features/post/postSlice.ts';
import Button from '@components/Button.tsx';
import { Spin } from 'antd';
import { setTab } from '@features/tab/tabSlice.ts';
import Loading from '@components/Loading.tsx';

const Friends = () => {
  const posts = useSelector(getPostsSelector);
  const postState = useSelector(postSliceSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setPosts([]));
    dispatch(getFriendPosts());
    document.title = 'TikTok - Make Your Day';
    dispatch(setTab('friends'));
  }, []);
  return (
    <div className="h-full flex-1 flex flex-col items-center overflow-y-auto py-5 pb-10">
      <div className="w-full md:w-[75%] lg:w-[60%] h-full flex flex-col">
        {posts &&
          posts.map((post: PostModel, index) => (
            <div className="h-fit" key={index}>
              <VideoRecommend post={post} />
              <div className="h-[1px] w-full bg-gray-100 my-5"></div>
            </div>
          ))}
        {posts && postState?.isError && (
          <div className="m-auto w-[300px] flex flex-col items-center">
            <p className="text-center">
              Something went error, please try again
            </p>
            <Button
              onClick={() => {
                window.location.reload();
              }}
              outline
              className=" max-w-[100px] py-2 px-2 mt-5"
            >
              Try again
            </Button>
          </div>
        )}
        {posts && postState?.isLoading && !postState.isError && <Loading />}
      </div>
    </div>
  );
};

export default Friends;
