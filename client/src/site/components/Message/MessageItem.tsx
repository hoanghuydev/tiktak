import React, { useState, useEffect, useRef } from 'react';
import { SlOptions } from 'react-icons/sl';
import ModalOptionMessage from './ModalOptionMessage';
import { ChatroomModel } from '@/models/chatroom';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import ReactTimeago from 'react-timeago';
import { MessageModel } from '@/models/message';

const MessageItem = ({ chatroom }: { chatroom: ChatroomModel }) => {
  const [isShowOptionsMenu, setIsShowOptionsMenu] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [chatroomName, setChatroomName] = useState<string>(chatroom.name);
  const [avatarChatroom, setAvatarChatroom] = useState<(string | undefined)[]>(
    []
  );
  const currentUser = useSelector(currentUserSelector);
  // Get chatroom name and avatar chatroom
  useEffect(() => {
    const otherMembers = chatroom.members.filter(
      (member) => member.memberData.id !== currentUser?.id
    );

    const name =
      otherMembers.length > 1
        ? otherMembers.map((member) => member.memberData.fullName).join(', ')
        : otherMembers.length === 1
        ? otherMembers[0].memberData.fullName
        : '';
    setChatroomName(name);

    const avatarUrls = otherMembers.map(
      (member) => member.memberData.avatarData.url
    );

    setAvatarChatroom(avatarUrls);
  }, [chatroom, currentUser]);

  // Function to handle click events outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsShowOptionsMenu(false);
        setIsHovered(false);
      }
    };

    if (isShowOptionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowOptionsMenu]);

  // Toggle modal visibility when clicking the icon
  const toggleOptionsMenu = () => {
    if (!isShowOptionsMenu) setIsHovered(true);
    setIsShowOptionsMenu((prev) => !prev);
  };

  return (
    <div
      className="parent-div flex items-center h-[76px] relative hover:bg-[#16182308] px-6 hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isShowOptionsMenu) setIsHovered(false);
      }}
    >
      <div className="min-w-14 max-w-14 h-14">
        {avatarChatroom.map((avatar) => (
          <img
            src={avatar}
            className="w-full h-full object-cover object-center rounded-full"
            alt="Avatar"
          />
        ))}
      </div>
      <div className="pl-3 w-full">
        <p className="text-[16px] font-semibold text-ellipsis overflow-hidden line-clamp-1">
          {chatroomName}
        </p>
        <p className="flex flex-nowrap justify-between w-full">
          <span className="text-ellipsis text-[14px] text-[#161823bf] overflow-hidden line-clamp-1">
            {(JSON.parse(chatroom.lastMessage) as MessageModel).content}
          </span>
          <span className="text-[14px] font-thin">
            <ReactTimeago
              date={
                (JSON.parse(chatroom.lastMessage) as MessageModel).createdAt
              }
            />
          </span>
        </p>
      </div>
      <div className="absolute w-6 h-6 top-6 right-4" ref={modalRef}>
        {isHovered && (
          <SlOptions
            size={16}
            onClick={toggleOptionsMenu}
            className="hover-show-icon cursor-pointer"
          />
        )}
        <div className="relative">
          {isShowOptionsMenu && <ModalOptionMessage />}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
