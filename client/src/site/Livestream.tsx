import Video from '@/components/Video';
import { setTab } from '@/features/tab/tabSlice';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Livestream = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setTab('livestream'));
  }, []);
  return <div></div>;
};

export default Livestream;
