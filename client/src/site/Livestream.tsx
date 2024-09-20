import Video from '@/components/Video';
import { setTab } from '@/features/tab/tabSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Livestream = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTab('livestream'));
    document.title = 'TikTok LIVE | TikTok';
  }, []);
  return <div className="overflow-y-auto"></div>;
};

export default Livestream;
