import Loading from '@components/Loading.tsx';
import PostSmall from '@components/PostSmall.tsx';
import { getPostsSelector, postSliceSelector } from '@/redux/selector.ts';
import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const VideoSearch = () => {
  const postSlice = useSelector(postSliceSelector);
  console.log(postSlice?.posts);

  return (
    <div className="overflow-y-auto grid gap-x-6 gap-y-4 px-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
      {!postSlice?.isLoading && postSlice?.posts.length == 0 && (
        <div>Not found posts</div>
      )}
      {postSlice?.isLoading && <Loading />}
      {postSlice?.posts.length != 0 &&
        postSlice?.posts.map((post) => (
          <PostSmall
            key={post.id}
            haveInfo
            post={post}
            className="max-w-[230px] flex-grow flex-shrink basis-[100px]"
          />
        ))}
    </div>
  );
};

export default VideoSearch;
