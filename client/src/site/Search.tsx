import { setTab } from '@/features/tab/tabSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParrams] = useSearchParams();
  const query = searchParrams.get('q');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setTab('search'));
  }, []);
  useEffect(() => {
    dispatch(setTab('search'));
    const safeQuery = query ? encodeURIComponent(query) : '';
    document.title = `Find '${safeQuery}' on TikTok | TikTok Search`;
  }, [query, dispatch]);
  return (
    <div>
      Search nè
      <Outlet />
    </div>
  );
};

export default Search;
