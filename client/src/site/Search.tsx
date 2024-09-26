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
  const [loading, setLoading] = useState<boolean>();
  const [loading1, setLoading1] = useState<boolean>();

  const [miniTab, setMiniTab] = useState<'top' | 'posts' | 'users' | 'live'>(
    'top'
  );
  const posts = useSelector(getPostsSelector);
  const users = useSelector(getUsersSelector);
  console.log(users);
  console.log(posts);
  useEffect(() => {
    console.log('Component mounted');
    dispatch(setTab('search'));
    console.log('dispatch empty');
    dispatch(setPosts([]));
    dispatch(setUsers([]));
    const safeQuery = q ? encodeURIComponent(q) : '';
    setQuery(safeQuery);
    document.title = `Find '${safeQuery}' on TikTok | TikTok Search`;

    return () => {
      console.log('Component unmounted');
    };
  }, []);
  useEffect(() => {
    if (!query) return;
    console.log(query);
    if ((users.length === 0 || posts.length === 0) && miniTab == 'top') {
      dispatch(searchUsersByName(query));
      dispatch(getPosts(query));
      console.log('dispatch users posts');
    }
    if (users.length === 0 && miniTab == 'users') {
      dispatch(searchUsersByName(query));
    }
    if (posts.length === 0 && miniTab == 'posts') {
      dispatch(getPosts(query));
    }
  }, [miniTab, query]);

  return (
    <div className="w-full ">
      <div className="max-w-[800px] mx-auto">
        <Tabs animated defaultActiveKey="top">
          <TabPane
            tab={
              <span
                className="mx-3 font-semibold"
                onClick={() => setMiniTab('top')}
              >
                Top
              </span>
            }
            key="top"
          >
            <TopSearch />
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
                onClick={() => setMiniTab('posts')}
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
