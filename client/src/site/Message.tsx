import React, { useEffect } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { GoArrowLeft } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import MessageItem from './components/Message/MessageItem';
import Chat from './components/Message/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { currentUserSelector, getChatroomsSelector } from '@/redux/selector';
import { getChatroomByUserId } from '@/features/chatroom/chatroomSlice';

const Message = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(currentUserSelector);
  const chatrooms = useSelector(getChatroomsSelector);
  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(getChatroomByUserId(currentUser.id));
    }
  }, [currentUser]);

  return (
    <div className="w-full h-full overflow-hidden bg-[#f8f8f8]">
      <div className="w-screen max-w-[100%] flex justify-center gap-3 pt-4 pr-6 pb-[10px] pl-5 h-full">
        <div className="bg-white h-full relative rounded-lg shadow-md w-[365px]">
          <div
            onClick={() => navigate(-1)}
            className="absolute left-[-56px] hidden md:flex bg-[#16182308] rounded-full p-3"
          >
            <GoArrowLeft size={18} />
          </div>
          <div className="flex items-center justify-between pt-3 pl-6 pr-4">
            <h1 className="font-bold text-[24px]">Messages</h1>
            <AiOutlineSetting size={24} />
          </div>
          <div className="overflow-y-auto h-full">
            {chatrooms.map((chatroom) => (
              <MessageItem chatroom={chatroom} />
            ))}
          </div>
        </div>
        <div className="bg-white max-w-[728px] flex-1 h-full rounded-lg shadow-md">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Message;