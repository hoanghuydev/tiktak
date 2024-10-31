import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatHeader, { ChatroomHeaderInfo } from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { fetchMessagesByChatroomId } from '@/features/socket/socketSlice';
import { currentUserSelector, getChatroomSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';

const Chat = () => {
  const chatroom = useSelector(getChatroomSelector());
  const currentUser = useSelector(currentUserSelector);
  const dispatch = useDispatch<AppDispatch>();
  const [chatroomHeaderInfo, setChatroomHeaderInfo] =
    useState<ChatroomHeaderInfo>({ name: '', subName: '', avatarUrls: [''] });
  useEffect(() => {
    if (chatroom && chatroom.id) {
      if (!chatroom.messages || chatroom.messages.length === 0) {
        dispatch(fetchMessagesByChatroomId(chatroom.id));
      }
      const otherMembers = chatroom.members.filter(
        (member) => member.memberData.id !== currentUser?.id
      );
      const name =
        otherMembers.length > 1
          ? otherMembers.map((member) => member.memberData.fullName).join(', ')
          : otherMembers[0]?.memberData.fullName || '';
      const subName =
        otherMembers.length > 1
          ? `${otherMembers.length} members`
          : `@${otherMembers[0]?.memberData.userName || ''}`;
      const avatarUrls = otherMembers.map(
        (member) => member.memberData.avatarData.url
      );
      setChatroomHeaderInfo({ name, subName, avatarUrls });
    }
  }, [chatroom, currentUser, dispatch]);

  return (
    <div className="h-full overflow-hidden">
      {chatroom && (
        <div className="flex flex-col h-full">
          <ChatHeader chatroomHeaderInfo={chatroomHeaderInfo!} />
          <MessageList
            messages={chatroom.messages || []}
            currentUser={currentUser!}
          />
          <ChatInput chatroomId={chatroom.id} />
        </div>
      )}
    </div>
  );
};

export default Chat;
