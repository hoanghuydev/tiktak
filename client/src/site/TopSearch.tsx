import { getPostsSelector, getUsersSelector } from '@/redux/selector';
import React from 'react';
import { useSelector } from 'react-redux';
import UserSearch from './UserSearch';
import VideoSearch from './VideoSearch';
import Loading from '@/components/Loading';

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
