import React, { useState, useEffect, useRef } from 'react';
import { SlOptions } from 'react-icons/sl';
import ModalOptionMessage from './ModalOptionMessage';
import { ChatroomModel } from '@/models/chatroom';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentUserSelector,
  getMessagesByChatroomIdSelector,
} from '@/redux/selector';
import ReactTimeago from 'react-timeago';
import { MessageModel } from '@/models/message';
import { AppDispatch } from '@/redux/store';
import { fetchMessagesByChatroomId } from '@/features/socket/socketSlice';
import { setChatroom } from '@/features/chatroom/chatroomSlice';

const ChatroomItem = ({ chatroom }: { chatroom: ChatroomModel }) => {
  const [isShowOptionsMenu, setIsShowOptionsMenu] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [chatroomName, setChatroomName] = useState<string>(chatroom.name);
  const [avatarChatroom, setAvatarChatroom] = useState<(string | undefined)[]>(
    []
  );
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(currentUserSelector);
  const messages = useSelector(getMessagesByChatroomIdSelector(chatroom.id));
  const handleSetChatroom = () => {
    dispatch(setChatroom(chatroom));
  };
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
      onClick={handleSetChatroom}
      className="parent-div flex items-center h-[76px] relative hover:bg-[#16182308] px-6 hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isShowOptionsMenu) setIsHovered(false);
      }}
    >
      <div className="min-w-14 max-w-14 h-14">
        {avatarChatroom.map((avatar) => (
          <img
            key={avatar}
            src={avatar}
            className="w-full h-full object-cover object-center rounded-full"
            alt="Avatar"
          />
        ))}
      </div>
      <div className="pl-3 w-full">
        <p className="text-[16px] font-semibold text-ellipsis overflow-hidden max-w-[200px] line-clamp-1">
          {chatroomName}
        </p>
        <p className="flex flex-nowrap justify-between w-full">
          <span className="text-ellipsis text-[14px] max-w-[150px] text-[#161823bf] max-h-[21px] line-clamp-1">
            {chatroom.lastMessage?.content ?? 'Trò chuyện ngay'}
          </span>
          <span className="text-[14px] font-thin whitespace-nowrap">
            {chatroom.lastMessage?.createdAt && (
              <ReactTimeago date={chatroom.lastMessage.createdAt} />
            )}
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
          {isShowOptionsMenu && <ModalOptionMessage chatroomId={chatroom.id} />}
        </div>
      </div>
    </div>
  );
};

export default ChatroomItem;
