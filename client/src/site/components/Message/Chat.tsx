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
  const [messagesFetched, setMessagesFetched] = useState(false);
  const [chatroomHeaderInfo, setChatroomHeaderInfo] =
    useState<ChatroomHeaderInfo>({ name: '', subName: '', avatarUrls: [''] });
  const [page, setPage] = useState(1);
  const fetchMessage = (
    chatroomId: number,
    options: {
      page?: number;
      pageSize?: number;
      orderBy?: string;
      orderDirection?: string;
    }
  ) => {
    dispatch(fetchMessagesByChatroomId({ chatroomId, options }))
      .unwrap()
      .then((data) => {
        if (data.data.messages.length > 0)
          setPage(data.data.pagination.page + 1);
        setMessagesFetched(true);
      })
      .catch(() => {
        setMessagesFetched(false);
      });
  };
  useEffect(() => {
    if (chatroom && chatroom.id) {
      if (!messagesFetched) {
        fetchMessage(chatroom.id, { page, pageSize: 15 });
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
  }, [chatroom?.id]);
  const handleFetchMoreMessages = () => {
    if (chatroom?.id) {
      fetchMessage(chatroom.id, { page, pageSize: 15 });
    }
  };
  return (
    <div className="h-full overflow-hidden">
      {chatroom && (
        <div className="flex flex-col h-full">
          <ChatHeader chatroomHeaderInfo={chatroomHeaderInfo!} />
          <MessageList
            currentUser={currentUser!}
            handleFetchMoreMessages={handleFetchMoreMessages}
          />
          <ChatInput chatroomId={chatroom.id} />
        </div>
      )}
    </div>
  );
};

export default Chat;
