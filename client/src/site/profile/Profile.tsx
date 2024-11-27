import UserService, { UserPayload } from '@features/user/userService.ts';
import { UserModel } from '@/models/user.ts';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileInfo from '../components/Profile/ProfileInfo.tsx';
import { PiUser } from 'react-icons/pi';
import clsx from 'clsx';
import ProfileTabs from '../components/Profile/ProfileTabs.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store.ts';
import { setTab } from '@features/tab/tabSlice.ts';
import { Spin } from 'antd';
import Loading from '@components/Loading.tsx';
import { setUser } from '@features/user/userSlice.ts';
import { getUserSelector } from '@/redux/selector.ts';

const Profile = () => {
  const { usernamehaveCuff } = useParams();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profileInfo = useSelector(getUserSelector);
  useEffect(() => {
    dispatch(setTab('profile'));
  }, []);
  useEffect(() => {
    dispatch(setUser({} as UserModel));
  }, []);
  // Get username
  useEffect(() => {
    // Check if username starts with '@'
    if (!usernamehaveCuff || !usernamehaveCuff.startsWith('@')) {
      navigate('/');
    } else {
      setUsername(usernamehaveCuff.slice(1)); // Remove the '@'
    }
  }, [usernamehaveCuff, navigate]);
  // Get profile info
  useEffect(() => {
    const getProfileInfo = async () => {
      if (username) {
        try {
          const profileInfo = await UserService.getProfile(username);
          document.title = profileInfo.user.userName
            ? `${profileInfo.user.userName} (@${profileInfo.user.fullName}) `
            : 'Profile';
          dispatch(setUser(profileInfo.user));
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
      }
    };
    getProfileInfo();
  }, [username]);
  return (
    <div className="w-full h-full overflow-y-auto">
      {loading && <Loading />}
      {profileInfo && !loading && (
        <div className="p-5">
          <ProfileInfo />
          <ProfileTabs userId={profileInfo.id!} />
        </div>
      )}
      {!profileInfo && !loading && (
        <div className="w-full h-full grid place-items-center">
          <div>
            <PiUser size={90} className="mx-auto" />
            <h3 className="text-xl font-bold text-center">
              Counldn't find this account
            </h3>
            <p className="text-center text-sm">
              Looking for videos? Try browsing our trending creators, hashtags,
              and sounds.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
