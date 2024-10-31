import React from 'react';

export interface ChatroomHeaderInfo {
  name: string;
  subName: string;
  avatarUrls: (string | undefined)[];
}

const ChatHeader = ({
  chatroomHeaderInfo,
}: {
  chatroomHeaderInfo: ChatroomHeaderInfo;
}) => (
  <div className="h-20 flex border-[#1618231f] border-b-[0.5px]">
    <div className="flex my-auto p-4 gap-3">
      <div className="min-w-12 flex max-w-12 h-12">
        <img
          src={chatroomHeaderInfo.avatarUrls[0]}
          className="object-cover my-auto object-center w-full h-full rounded-full"
        />
      </div>
      <div>
        <p className="text-[18px] font-semibold text-ellipsis overflow-hidden line-clamp-1">
          {chatroomHeaderInfo.name}
        </p>
        <p className="text-[16px] text-[#161823bf] text-ellipsis overflow-hidden line-clamp-1">
          {chatroomHeaderInfo.subName}
        </p>
      </div>
    </div>
  </div>
);

export default ChatHeader;
