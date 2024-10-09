import Button from '@/components/Button';
import { UserModel } from '@/models/user';
import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineUserSwitch } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { SlFire, SlOptions } from 'react-icons/sl';
import ModalListUser from './ModalListUser';

interface ProfileInfoProps {
  profileInfo: UserModel;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileInfo }) => {
  const {
    fullName,
    userName,
    followings,
    followers,
    likes,
    bio,
    avatarData,
    isMe,
    isFollow,
    isFriend,
    friends,
    id,
  } = profileInfo;
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<
    'followings' | 'friends' | 'followers'
  >('followings');
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <ModalListUser
        userId={id}
        onClose={handleCloseModal}
        title={userName}
        isOpen={isOpen}
        followers={followers}
        followings={followings}
        friends={friends}
        activeKey={activeKey}
      />
      {/* Profile Header Info */}
      <div className="flex gap-4 md:gap-4 w-full">
        <div className="avatar my-auto min-w-20 max-w-20 h-20 md:min-w-24 md:max-w-24 md:h-24">
          <img
            className="w-full h-full object-cover object-center rounded-full"
            src={avatarData.url ?? ''}
            alt={`Avatar user ${userName}`}
          />
        </div>
        <div className="flex flex-wrap justify-between w-full max-w-[550px]">
          {/* Text User Info */}
          <div className="user-info">
            <h4 className="text-[26px] font-[500] md:text-[30px]">
              {userName}
            </h4>
            <p className="font-semibold">{fullName}</p>
            {(!isMe || isMe == 0) && (
              <div className="flex gap-2 mt-4">
                {(!isFollow || isFollow == 0) && (
                  <Button
                    outline
                    className="px-2 text-[14px] max-w-[100px] font-semibold py-1"
                  >
                    Follow
                  </Button>
                )}
                <Button
                  outline
                  className="px-2 text-[14px]  max-w-[100px]  font-semibold py-1"
                >
                  Message
                </Button>

                {(isFriend || isFriend == 1) && (
                  <div className="grid place-items-center my-auto ms-2 rounded-sm border-gray-400 border-[1px] p-2">
                    <AiOutlineUserSwitch />
                  </div>
                )}
              </div>
            )}
            {(isMe || isMe == 1) && (
              <div className="flex gap-2 mt-4">
                <Button
                  outlineBlack
                  icon={<AiOutlineEdit className="my-auto" size={20} />}
                  className="p-[5px] font-semibold"
                >
                  <p className="text-[14px]">Edit Profile</p>
                </Button>
                <Button
                  outlineBlack
                  icon={<SlFire className="my-auto" size={20} />}
                  className="p-[5px]  font-semibold whitespace-nowrap"
                >
                  <div className="text-[14px]">Promote Post</div>
                </Button>
              </div>
            )}
          </div>
          {/* End text user info */}
          <div className="flex mt-3 gap-3">
            <RiShareForwardLine size={23} />
            {!isMe && <SlOptions size={23} />}
          </div>
        </div>
      </div>
      {/* Profile Follow Info */}
      <div className="flex gap-4 my-2">
        <span
          className=" text-[15px] hover:cursor-pointer hover:underline"
          onClick={() => {
            setIsOpen(true);
            setActiveKey('followings');
          }}
        >
          <strong>{followings ?? 0}</strong> Following
        </span>
        <span
          className=" text-[15px] hover:cursor-pointer hover:underline"
          onClick={() => {
            setIsOpen(true);
            setActiveKey('followers');
          }}
        >
          <strong>{followers ?? 0}</strong> Followers
        </span>
        <span className=" text-[15px]">
          <strong>{likes ?? 0}</strong> Likes
        </span>
      </div>
      {/* Bio */}
      <p className="text-[14px]">{bio ?? 'No bio yet.'}</p>
    </div>
  );
};

export default ProfileInfo;
