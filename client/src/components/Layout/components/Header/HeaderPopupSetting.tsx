import { setCurrentUser } from '@/features/auth/authSlice';
import { currentUserSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import React from 'react';
import { FaRegMoon } from 'react-icons/fa6';
import { LuUser2 } from 'react-icons/lu';
import { TbLogout, TbSettings2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeaderPopupSetting = () => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    dispatch(setCurrentUser(null));
  };
  return (
    <div>
      <div className="popup-top-arrow w-8 h-[8px] absolute top-full right-0"></div>
      <ul className="shadow-md rounded-md z-30 bg-white list-none absolute right-0 top-[calc(100%+8px)]">
        <li className="text-black flex hover:cursor-pointer hover:bg-[#16182308]">
          <a
            href={'/profile/@' + user?.userName}
            className="ps-4 py-[10px] pe-2 flex gap-1"
          >
            <LuUser2 size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              View profile
            </span>
          </a>
        </li>
        <li className="text-black flex hover:cursor-pointer hover:bg-[#16182308]">
          <a href={'/setting'} className="ps-4 py-[10px] pe-2 flex gap-1">
            <TbSettings2 size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Settings
            </span>
          </a>
        </li>
        <li className="text-black flex hover:cursor-pointer hover:bg-[#16182308]">
          <div className="ps-4 py-[10px] pe-2 flex gap-1">
            <FaRegMoon size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Dark mode
            </span>
          </div>
        </li>
        <li className="text-black flex hover:cursor-pointer hover:bg-[#16182308] border-t-[1px] border-[#1618231f]">
          <div
            className="ps-4 py-[10px] pe-2 flex gap-1"
            onClick={handleLogout}
          >
            <TbLogout size={16} className="my-auto" />
            <span className="font-semibold my-auto whitespace-nowrap">
              Log out
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderPopupSetting;
