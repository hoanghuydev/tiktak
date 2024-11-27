import { getPostsSelector, getUsersSelector } from '@/redux/selector.ts';
import React from 'react';
import { useSelector } from 'react-redux';
import UserSearch from './UserSearch.tsx';
import VideoSearch from './VideoSearch.tsx';
import Loading from '@components/Loading.tsx';

const TopSearch = () => {
  const posts = useSelector(getPostsSelector);
  const users = useSelector(getUsersSelector);

  return (
    <div>
      {(users.length == 0 || posts.length == 0) && <Loading />}
      {users.length != 0 && posts.length != 0 && (
        <div>
          <p className="pb-3 text-[16px] font-bold">Users</p>
          <UserSearch />
          <p className="py-3 text-[16px] font-bold">Videos</p>
          <VideoSearch />
        </div>
      )}
    </div>
  );
};

export default TopSearch;
