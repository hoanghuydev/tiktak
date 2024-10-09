import { UserModel } from '@/models/user';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const User = ({ user }: { user: UserModel }) => {
  return (
    <Link to={'/profile/@' + user.userName}>
      <div className="flex justify-between">
        <div className="flex gap-2 py-3 hover:bg-[#f8f8f8] max-w-[60%]">
          <div className=" min-w-[45px] max-w-[45px] h-[45px] lg:min-w-[56px] lg:max-w-[56px] lg:h-[56px] rounded-full me-4 overflow-hidden">
            <img
              src={user.avatarData.url || ''}
              className="w-full h-full object-cover"
              alt="User Data"
            />
          </div>
          <div>
            <p className="text-[18px] font-bold overflow-hidden text-ellipsis">
              {user.userName}
            </p>
            <p className="text-[14px] overflow-hidden font-light text-ellipsis">
              {user.fullName} · <strong className="font-bold">0M</strong>{' '}
              Followers
            </p>
            <p className="text-[14px] overflow-hidden text-ellipsis">
              {user.bio}
            </p>
          </div>
        </div>
        <div>
          <Button className="w-[100px] rounded-md">Follow back</Button>
        </div>
      </div>
    </Link>
  );
};

export default User;
