import InputFormEditable from '@/components/InputFormEditable';
import MessageService from '@/features/message/messageService';
import { MessageModel } from '@/models/message';
import { MessageType } from '@/utils/constants';
import React, { useState } from 'react';

const ChatInput = ({ chatroomId }: { chatroomId: number }) => {
  const [loading, setLoading] = useState(false);
  const handleSendMessage = async (content: string) => {
    setLoading(true);
    await MessageService.sendMessage(chatroomId, {
      content,
      type: MessageType.TEXT,
    } as MessageModel);
  };
  return (
    <div className=" border-t-[0.5px] border-[#1618231f]">
      <InputFormEditable
        hasImage={true}
        maxCharToShowCountText={24}
        placeholder="Send a message..."
        handleSubmit={handleSendMessage}
        maxCharacters={3000}
      />
    </div>
  );
};
export default ChatInput;
