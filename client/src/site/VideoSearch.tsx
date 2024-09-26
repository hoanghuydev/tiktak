import Loading from '@/components/Loading';
import PostSmall from '@/components/PostSmall';
import { getPostsSelector } from '@/redux/selector';
import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

const VideoSearch = () => {
  const posts = useSelector(getPostsSelector);
  return (
    <div className="overflow-y-auto flex gap-4 px-5 flex-wrap">
      {posts.length == 0 && <Loading />}
      {posts.length != 0 &&
        posts.map((post) => (
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
