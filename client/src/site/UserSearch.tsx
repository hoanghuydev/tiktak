import { getUsersSelector } from '@/redux/selector';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserSearch = () => {
  const users = useSelector(getUsersSelector);
  useEffect(() => {}, []);
  return <div>UserSearch</div>;
};

export default UserSearch;
