import User from '@/components/User';
import FollowService from '@/features/follow/followService';
import { UserModel } from '@/models/user';
import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

interface ModalListUserProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  followers: number;
  followings: number;
  friends: number;
  activeKey: 'followings' | 'friends' | 'followers';
  userId: number;
}

const ModalListUser: React.FC<ModalListUserProps> = ({
  isOpen,
  onClose,
  title,
  followers,
  followings,
  friends,
  activeKey,
  userId,
}) => {
  const [followerList, setFollowerList] = useState<UserModel[]>([]);
  const [friendList, setFriendList] = useState<UserModel[]>([]);
  const [followingList, setFollowingList] = useState<UserModel[]>([]);
  const [miniTab, setMiniTab] = useState(activeKey);

  const handleTabChange = (key: string) => {
    setMiniTab(key as 'followings' | 'friends' | 'followers');
    switch (key) {
      case 'followers':
        FollowService.getListFollower(userId).then(setFollowerList);
        break;
      case 'followings':
        FollowService.getListFollowing(userId).then(setFollowingList);
        break;
      case 'friends':
        FollowService.getListFriend(userId).then(setFriendList);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleTabChange(activeKey); // Load initial tab content
  }, [activeKey]);

  return (
    <Modal
      title={<h3 className="text-center">{title}</h3>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="z-50"
    >
      <Tabs animated activeKey={miniTab} onChange={handleTabChange}>
        <Tabs.TabPane tab={`Following ${followings}`} key="followings">
          {followingList.map((following) => (
            <User user={following} />
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Followers ${followers}`} key="followers">
          {/* Render followerList content here */}
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Friends ${friends}`} key="friends">
          {/* Render friendList content here */}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default ModalListUser;
