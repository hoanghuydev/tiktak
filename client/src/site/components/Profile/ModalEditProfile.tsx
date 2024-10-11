import UserService from '@/features/user/userService';
import { UserModel } from '@/models/user';
import { Modal, Input, Button, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';

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

  return (
    <Modal
      open={isOpen}
      title={<h1 className="text-xl">{title || 'Edit Profile'}</h1>}
      onCancel={onClose}
      footer={null}
      className="z-50"
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
          />
          <label htmlFor="avatarUser">Change photo</label>
        </Button>

        <div className="w-full">
          <label className="text-sm text-gray-600">Username</label>
          <Input value={userInfo?.userName} readOnly className="mt-1" />
          <p className="text-xs text-gray-500 mt-1">
            Usernames can only contain letters, numbers, underscores, and
            periods.
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Name</label>
          <Input
            value={userInfo?.fullName}
            className="mt-1"
            placeholder="Enter your name"
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Your nickname can only be changed once every 7 days.
          </p>
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Bio</label>
          <Input.TextArea
            value={userInfo?.bio}
            className="mt-1"
            placeholder="Bio"
            maxLength={80}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            {userInfo?.bio?.length || 0}/80
          </p>
        </div>

        <Button
          type="primary"
          className="w-full mt-4"
          onClick={() => {
            console.log('Save user info:', userInfo);
            onClose();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEditProfile;
