import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { UserModel } from '@/models/user';
import { MessageModel } from '@/models/message';
import { IoIosMore } from 'react-icons/io';
import { message, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteMessageById } from '@/features/socket/socketSlice';
import { getChatroomSelector } from '@/redux/selector';

interface MessageListProps {
  messages: MessageModel[];
  currentUser: UserModel;
  handleFetchMoreMessages: () => void;
}

const MessageList = ({
  messages,
  currentUser,
  handleFetchMoreMessages,
}: MessageListProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const firstMessageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const chatroom = useSelector(getChatroomSelector());

  // To control whether new messages are being loaded
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ensure the container scrolls to the bottom when the component mounts
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const firstMessageOffset = firstMessageRef.current?.offsetTop || 0;
        const containerTop = container.scrollTop;
        console.log('First element :' + firstMessageOffset);
        console.log('Current :' + containerTop);

        // Check if the user has scrolled near the top of the chat (to fetch more messages)
        if (containerTop == 0 && !isLoading) {
          // setIsLoading(true);
          // handleFetchMoreMessages();
        }
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, handleFetchMoreMessages]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    // Reset loading state after messages are fetched
    setIsLoading(false);
  }, [messages]);

  const handleDeleteMessageById = (messageId: number) => {
    if (chatroom?.id)
      dispatch(deleteMessageById({ chatroomId: chatroom.id, messageId })) // Assuming chatroomId is part of the message object
        .unwrap()
        .then(() => {
          message.success('Message deleted successfully');
        });
  };

  const tooltipContent = (messageId: number) => (
    <div className="flex gap-2 text-white">
      <p className="text-white text-[12px] hover:cursor-pointer hover:underline">
        Like
      </p>
      <p
        className="text-white text-[12px] hover:cursor-pointer hover:underline"
        onClick={() => handleDeleteMessageById(messageId)}
      >
        Delete
      </p>
    </div>
  );

  return (
    <div ref={containerRef} className="flex-1 overflow-auto">
      <div className="flex flex-col-reverse">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={
              index === 0
                ? lastMessageRef
                : index === messages.length - 1
                ? firstMessageRef
                : null
            } // Attach ref only to the last message
            className="my-2 group"
          >
            <div
              className={clsx(
                'flex gap-3',
                message.sender === currentUser.id
                  ? 'flex-row-reverse mr-2'
                  : 'ml-2'
              )}
            >
              <div className="max-w-8 my-auto min-w-8 h-8">
                <img
                  src={message.senderData.avatarData.url}
                  alt="User avatar"
                  className="object-cover w-full h-full object-center rounded-full"
                />
              </div>
              <div
                className={clsx(
                  'rounded-md border-[#1618231f] border-[1px] max-w-[300px] overflow-hidden whitespace-pre-line text-[16px] py-2 px-3',
                  message.sender === currentUser.id ? 'bg-[#1618230f]' : ''
                )}
              >
                <p>{message.content}</p>
              </div>
              <Tooltip title={tooltipContent(message.id)} trigger="click">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:cursor-pointer">
                  <IoIosMore size={16} />
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
