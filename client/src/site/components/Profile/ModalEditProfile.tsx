import {
  updateAvatar,
  updateFullNameAndUserName,
} from '@/features/auth/authSlice';
import UserService from '@/features/user/userService';
import { setUserAvatar } from '@/features/user/userSlice';
import { UserModel } from '@/models/user';
import { currentUserSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';

import { Modal, Input, Button, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ModalEditProfileProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ModalEditProfile: React.FC<ModalEditProfileProps> = ({
  isOpen,
  onClose,
  title,
}) => {
  const [userInfo, setUserInfo] = useState<Partial<UserModel> | null>(null);
  const currentUserData = useSelector(currentUserSelector);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUserData) {
      navigate('/login');
    }
  }, [currentUserData, navigate]);
  useEffect(() => {
    if (isOpen) {
      UserService.me().then((resp) => setUserInfo(resp.user));
    }
  }, [isOpen]);

  const handleInputChange = (key: keyof UserModel, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setUserInfo(
        (prev): Partial<UserModel> => ({
          ...prev,
          avatarData: {
            ...prev?.avatarData,
            url: URL.createObjectURL(file),
          },
        })
      );
    }
  };

  const handleSave = async () => {
    try {
      if (userInfo) {
        const { userName, fullName, bio } = userInfo;

        interface UserInfo {
          id: number;
          userName: string;
          fullName: string;
          bio: string;
        }

        interface UpdateUserFields {
          userId: number;
          userName?: string;
          fullName?: string;
          bio?: string;
        }

        // Giả sử currentUserData và userInfo đã được định nghĩa và có kiểu UserInfo
        const updatedFields: Partial<UpdateUserFields> = {};

        if (userName !== currentUserData!.userName) {
          updatedFields.userName = userName;
        }
        if (fullName !== currentUserData!.fullName) {
          updatedFields.fullName = fullName;
        }
        if (bio !== currentUserData!.bio) {
          updatedFields.bio = bio;
        }
        if (Object.keys(updatedFields).length > 0) {
          const resp = await dispatch(
            updateFullNameAndUserName({
              userId: userInfo.id!,
              ...updatedFields,
            } as UpdateUserFields)
          ).unwrap();

          if (resp.err === 0) {
            navigate(
              `/profile/@${updatedFields.userName || currentUserData!.userName}`
            );
          }
        }

        // Check if there's a new avatar to update
        if (avatarFile) {
          const resp = await dispatch(
            updateAvatar({
              userId: userInfo.id!,
              avatarFile,
            })
          ).unwrap();
          dispatch(setUserAvatar(resp.user.avatarData.url!));
        }
      }
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Modal
      open={isOpen}
      title={<h1 className="text-xl">{title || 'Edit Profile'}</h1>}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
      className="z-50 w-screen h-screen"
    >
      <div className="flex flex-col items-center space-y-4 p-4">
        <Avatar
          size={100}
          src={userInfo?.avatarData?.url || 'default-avatar-url'}
        />
        <Button type="link" className="text-blue-500">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="avatarUser"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatarUser">Change photo</label>
        </Button>

        <div className="w-full">
          <label className="text-sm text-gray-600">Username</label>
          <Input
            value={userInfo?.userName}
            name="userName"
            className="mt-1 bg-[#1618230f]"
            onChange={(e) => handleInputChange('userName', e.target.value)}
          />
          <p className="text-[10px] text-gray-500 mt-1">
            www.tiktok.com/@hoanghuydev
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            Usernames can only contain letters, numbers, underscores, and
            periods. Changing your username will also change your profile link.
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Name</label>
          <Input
            value={userInfo?.fullName}
            className="mt-1 bg-[#1618230f]"
            name="fullName"
            placeholder="Enter your name"
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          <p className="text-[10px] text-gray-500 mt-1">
            Your nickname can only be changed once every 7 days.
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Bio</label>
          <Input.TextArea
            value={userInfo?.bio}
            className="mt-1 bg-[#1618230f] rounded-md"
            placeholder="Bio"
            maxLength={80}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            {userInfo?.bio?.length || 0}/80
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditProfile;
