import PostService, { PostsPayload } from '@/features/post/postService';
import { PostModel } from '@/models/post';
import React, { useEffect, useState } from 'react';
import VideoRecommend from './components/VideoRecommend';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, postSliceSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { getPosts } from '@/features/post/postSlice';
import Button from '@/components/Button';
import { Spin } from 'antd';
import { setTab } from '@/features/tab/tabSlice';
import Loading from '@/components/Loading';

const Home = () => {
  const posts = useSelector(getPostsSelector);
  const postSlice = useSelector(postSliceSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(setTab('home'));
    document.title = 'TikTok - Make Your Day';
  }, []);
  return (
    <div className="h-full flex-1 flex flex-col items-center overflow-y-auto">
      <div className="w-full h-full flex flex-col snap-y snap-mandatory overflow-y-scroll scrollbar-none">
        {posts &&
          posts.map((post: PostModel, index) => (
            <VideoRecommend post={post} key={index} />
          ))}
        {posts && postSlice?.isError && (
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
        {posts && postSlice?.isLoading && !postSlice.isError && <Loading />}
      </div>
    </div>
  );
};

export default Home;
