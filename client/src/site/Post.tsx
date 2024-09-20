import PostService from '@/features/post/postService';
import { PostModel } from '@/models/post';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostInfo from './components/Post/PostInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostLoadingSelector,
  getPostSelector,
  postSliceSelector,
} from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { setPost } from '@/features/post/postSlice';

const Post = () => {
  let { postId } = useParams();
  const parsedPostId = parseInt(postId ?? '0');
  const post = useSelector(getPostSelector);
  const postSlice = useSelector(postSliceSelector);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getPostInfoById = async (postId: number) => {
      const resp = await PostService.getPostById(postId);
      dispatch(setPost(resp.post));
    };
    getPostInfoById(parsedPostId);
  }, [parsedPostId]);

  return (
    <div className=" h-full">
      {!postSlice?.isLoading && post && (
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* First row: video */}
          <div className="md:col-span-2 bg-black grid place-items-center">
            <video
              autoPlay
              loop
              className="w-full md:w-fit md:h-full object-cover object-center"
              src={post?.videoUrl ?? ''}
            ></video>
          </div>

          {/* Second row: post details */}
          <div className="md:col-span-1 bg-white p-2 md:p-5 overflow-y-auto relative">
            <PostInfo />
          </div>
        </div>
      )}
      {!postSlice?.isLoading && !post && <div>Not found post</div>}
    </div>
  );
};

export default Post;
