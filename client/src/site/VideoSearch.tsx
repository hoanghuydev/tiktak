import Loading from '@/components/Loading';
import PostSmall from '@/components/PostSmall';
import { getPostsSelector, postSliceSelector } from '@/redux/selector';
import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const VideoSearch = () => {
  const postSlice = useSelector(postSliceSelector);
  return (
    <div className="overflow-y-auto flex gap-4 px-5 flex-wrap">
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
