import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { UserModel } from '@/models/user';
import { MessageModel } from '@/models/message';

interface MessageListProps {
  messages: MessageModel[];
  currentUser: UserModel;
}

const MessageList = ({ messages, currentUser }: MessageListProps) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current && containerRef.current) {
      const lastMessageOffset = lastMessageRef.current.offsetTop;
      containerRef.current.scrollTo({
        top: lastMessageOffset + 5,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="flex-1 overflow-auto">
      <div className="flex flex-col-reverse">
        {messages.map((message, index) => (
          <div
            key={message.id}
            ref={index === 0 ? lastMessageRef : null} // Attach ref only to the last message
            className="my-2"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
