import UserService, { UserPayload } from '@/features/user/userService';
import { UserModel } from '@/models/user';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileInfo from './components/Profile/ProfileInfo';
import { PiUser } from 'react-icons/pi';
import clsx from 'clsx';
import ProfileTabs from './components/Profile/ProfileTabs';

const Profile = () => {
  const { usernamehaveCuff } = useParams();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState<UserModel>();
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
    if (username)
      UserService.getProfile(username).then((payload) => {
        setProfileInfo(payload.user);
        setLoading(false);
      });
  }, [username]);
  return (
    <div className="w-full h-full overflow-y-auto">
      {profileInfo && !loading && (
        <div className="p-5">
          <ProfileInfo profileInfo={profileInfo} />
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
