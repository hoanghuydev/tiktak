import { deleteAllMessage } from '@/features/socket/socketSlice';
import { AppDispatch } from '@/redux/store';
import { message } from 'antd';
import React from 'react';
import { FiFlag } from 'react-icons/fi';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { MdBlock } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

const ModalOptionMessage = ({ chatroomId }: { chatroomId: number }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteAllMessage = () => {
    dispatch(deleteAllMessage(chatroomId))
      .unwrap()
      .then(() => {
        message.success('All messages deleted successfully');
      });
  };

  return (
    <div>
      <div className="w-0 h-0 absolute top-full right-[8px] border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
      <ul className="shadow-md rounded-md z-30 bg-white list-none absolute right-0 top-[calc(100%+8px)] min-w-[200px]">
        <li className="text-black flex  px-4 hover:cursor-pointer hover:bg-[#16182308] border-b-[1px] border-[#1618231f]">
          <div className="ps-2 py-[10px] pe-2 flex gap-1">
            <IoNotificationsOffOutline size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Mute
            </span>
          </div>
        </li>
        <li
          className="text-black flex  px-4 hover:cursor-pointer hover:bg-[#16182308]  border-b-[1px] border-[#1618231f]"
          onClick={handleDeleteAllMessage}
        >
          <div className="ps-2 py-[10px] pe-2 flex gap-1">
            <RiDeleteBin5Line size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Delete
            </span>
          </div>
        </li>
        <li className="text-black flex  px-4 hover:cursor-pointer hover:bg-[#16182308]  border-b-[1px] border-[#1618231f]">
          <div className="ps-2 py-[10px] pe-2 flex gap-1">
            <FiFlag size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Report
            </span>
          </div>
        </li>
        <li className="text-black flex  px-4 hover:cursor-pointer hover:bg-[#16182308]  ">
          <div className="ps-2 py-[10px] pe-2 flex gap-1">
            <MdBlock size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Block
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ModalOptionMessage;
