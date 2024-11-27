import { setTab } from '@features/tab/tabSlice.ts';
import { getPostsSelector, getUsersSelector } from '@/redux/selector.ts';
import { AppDispatch } from '@/redux/store.ts';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useCallback, useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';
import TopSearch from './components/TopSearch.tsx';
import UserSearch from './components/UserSearch.tsx';
import VideoSearch from './components/VideoSearch.tsx';
import LiveSearch from './components/LiveSearch.tsx';
import { getPosts, setPosts } from '@features/post/postSlice.ts';
import { searchUsersByName, setUsers } from '@features/user/userSlice.ts';

const Search = () => {
  const [searchParrams] = useSearchParams();
  const q = searchParrams.get('q');
  const dispatch = useDispatch<AppDispatch>();
  const [miniTab, setMiniTab] = useState<'videos' | 'users' | 'live'>('videos');
  const posts = useSelector(getPostsSelector);
  const users = useSelector(getUsersSelector);
  useEffect(() => {
    dispatch(setTab('search'));
  }, []);
  useEffect(() => {
    const query = q ? encodeURIComponent(q) : '';
    document.title = `Find '${query}' on TikTok | TikTok Search`;
    if (!query) return;
    if (miniTab == 'users') {
      dispatch(setUsers([]));
      dispatch(searchUsersByName(query));
      return;
    }
    if (miniTab == 'videos') {
      dispatch(setPosts([]));
      dispatch(getPosts(query));
      return;
    }
  }, [miniTab]);
  const handleTabChange = useCallback((key: string) => {
    setMiniTab(key as 'videos' | 'users' | 'live');
  }, []);

  return (
    <div className="w-full ">
      <div className="max-w-[800px] mx-auto">
        <Tabs animated defaultActiveKey="videos" onTabClick={handleTabChange}>
          <TabPane
            className="flex flex-col"
            tab={<span className="mx-3 font-semibold">Videos</span>}
            key="videos"
          >
            <VideoSearch />
          </TabPane>
          <TabPane
            className="flex flex-col"
            tab={<span className="mx-3 font-semibold">Users</span>}
            key="users"
          >
            <UserSearch />
          </TabPane>

          <TabPane
            className="flex flex-col"
            tab={<span className="mx-3 font-semibold">LIVE</span>}
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
