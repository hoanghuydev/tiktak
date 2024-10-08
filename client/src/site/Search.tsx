import { setTab } from '@/features/tab/tabSlice';
import { getPostsSelector, getUsersSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';
import TopSearch from './TopSearch';
import UserSearch from './UserSearch';
import VideoSearch from './VideoSearch';
import LiveSearch from './LiveSearch';
import { getPosts, setPosts } from '@/features/post/postSlice';
import { searchUsersByName, setUsers } from '@/features/user/userSlice';

const Search = () => {
  const [searchParrams] = useSearchParams();
  const q = searchParrams.get('q');
  const [query, setQuery] = useState(q);
  const dispatch = useDispatch<AppDispatch>();
  const [miniTab, setMiniTab] = useState<'videos' | 'users' | 'live'>('videos');
  const posts = useSelector(getPostsSelector);
  const users = useSelector(getUsersSelector);
  useEffect(() => {
    dispatch(setTab('search'));
    dispatch(setPosts([]));
    dispatch(setUsers([]));
    const safeQuery = q ? encodeURIComponent(q) : '';
    setQuery(safeQuery);
    document.title = `Find '${safeQuery}' on TikTok | TikTok Search`;
  }, []);
  useEffect(() => {
    if (!query) return;
    if (users.length === 0 && miniTab == 'users') {
      dispatch(searchUsersByName(query));
      return;
    }
    if (posts.length === 0 && miniTab == 'videos') {
      dispatch(getPosts(query));
      return;
    }
  }, [miniTab, query]);

  return (
    <div className="w-full ">
      <div className="max-w-[800px] mx-auto">
        <Tabs animated defaultActiveKey="videos">
          <TabPane
            className="flex flex-col"
            tab={
              <span
                className="mx-3 font-semibold"
                onClick={() => setMiniTab('videos')}
              >
                Videos
              </span>
            }
            key="videos"
          >
            <VideoSearch />
          </TabPane>
          <TabPane
            className="flex flex-col"
            tab={
              <span
                className="mx-3 font-semibold"
                onClick={() => setMiniTab('users')}
              >
                Users
              </span>
            }
            key="users"
          >
            <UserSearch />
          </TabPane>

          <TabPane
            className="flex flex-col"
            tab={
              <span
                className="mx-3 font-semibold"
                onClick={() => setMiniTab('live')}
              >
                LIVE
              </span>
            }
            key="live"
          >
            <LiveSearch />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Search;
