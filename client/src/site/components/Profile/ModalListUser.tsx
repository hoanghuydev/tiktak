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
  useEffect(() => {
    setFollowerList([]);
    setFollowingList([]);
    setFriendList([]);
  }, [userId]);
  const handleTabChange = (key: string) => {
    setMiniTab(key as 'followings' | 'friends' | 'followers');
    switch (key) {
      case 'followers':
        FollowService.getListFollower(userId).then((resp) => {
          setFollowerList(resp.users);
        });
        break;
      case 'followings':
        FollowService.getListFollowing(userId).then((resp) => {
          setFollowingList(resp.users);
        });
        break;
      case 'friends':
        FollowService.getListFriend(userId).then((resp) =>
          setFriendList(resp.users)
        );
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
      <Tabs
        animated
        activeKey={miniTab}
        onChange={handleTabChange}
        className="h-[calc(100vh-300px)]"
      >
        <Tabs.TabPane tab={`Following ${followings ?? 0}`} key="followings">
          {followingList.map((following, index) => (
            <User user={following} key={index} />
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Followers ${followers ?? 0}`} key="followers">
          {followerList.map((follower, index) => (
            <User user={follower} key={index} />
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab={`Friends ${friends ?? 0}`} key="friends">
          {friendList.map((friend, index) => (
            <User user={friend} key={index} />
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default ModalListUser;
