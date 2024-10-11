import { UserModel } from '@/models/user';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { SocialActionUtil } from '@/utils/socialActionsUtil';

const User = ({ user }: { user: UserModel }) => {
  console.log(user);
  const [isFollowing, setIsFollowing] = useState(Boolean(user.isFollow));
  const handleFollowUser = () => {
    SocialActionUtil.followAndUnfollowUser(user.id, isFollowing, () => {
      setIsFollowing(!isFollowing);
    });
  };
  return (
    <div className="flex justify-between w-full flex-nowrap gap-5">
      <Link to={'/profile/@' + user.userName}>
        <div className="flex gap-2 py-3 ">
          <div className=" min-w-[45px] max-w-[45px] h-[45px] lg:min-w-[56px] lg:max-w-[56px] lg:h-[56px] rounded-full me-4 overflow-hidden">
            <img
              src={user.avatarData?.url || ''}
              className="w-full h-full object-cover"
              alt="User Data"
            />
          </div>
          <div className="w-full text-ellipsis overflow-hidden max-w-[190px]">
            <p className="text-[18px] font-bold overflow-hidden text-ellipsis line-clamp-1">
              {user.userName}
            </p>
            <p className="text-[14px] overflow-hidden font-light text-ellipsis line-clamp-1">
              {user.fullName} · <strong className="font-bold">0M</strong>{' '}
              Followers
            </p>
            <p className="text-[14px] overflow-hidden text-ellipsis line-clamp-1">
              {user.bio}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex ">
        {!user.isMe && (
          <Button
            secondary={isFollowing ? true : false}
            bgGray={isFollowing ? true : false}
            className="w-[100px] m-auto rounded-md whitespace-nowrap"
            onClick={handleFollowUser}
          >
            {isFollowing ? 'Following' : 'Follow back'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default User;
