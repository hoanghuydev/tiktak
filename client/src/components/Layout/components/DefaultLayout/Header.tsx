import React from 'react';
import { FaEllipsisVertical, FaPlus } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import TiktokLogo from '@/assets/tiktok-logo.svg';
import { TbPointFilled } from 'react-icons/tb';
import Button from '@/components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import { FiSend } from 'react-icons/fi';
import { RiMessageLine } from 'react-icons/ri';
import clsx from 'clsx';
const Header = () => {
  const user = useSelector(currentUserSelector);
  const navigate = useNavigate();
  return (
    <header className="h-[60px] bg-white justify-between shadow-sm flex items-center ps-4 pe-6 border-b-[1px] border-b-gray-200">
      <div className="logo w-[280px]">
        <a href="/">
          <img src={TiktokLogo} width="110px" alt="Tiktok logo" />
        </a>
      </div>
      <div className="flex-1 me-2 hidden md:flex max-w-[500px] ">
        <div className="w-full border-[1px] border-gray-300 px-4 py-[9px] bg-gray-100 rounded-full flex relative ">
          <input
            id="searchInputHeader"
            className="ms-2 outline-none border-none my-auto flex-1 bg-transparent text-color"
            placeholder="Search"
          />
          <div
            className="absolute top-[100%] w-full h-[15px] hidden"
            id="lineHiddenSearchInputHeader"
          ></div>
          <div
            id="searchPopupHeader"
            className="p-4 hidden absolute bg-white shadow-custom rounded-md top-[55px] start-0 end-0"
          >
            <p className="font-bold text-[12px] text-gray-400">You may like</p>
            <div className="flex mt-2 gap-3">
              <TbPointFilled className="text-gray-300 my-auto" fontSize={14} />
              <Link to={'/login'} className="font-semibold text-[16px]">
                Trend Tập Nhảy Từng Quen
              </Link>
            </div>
          </div>
          <div className="w-[1px] h-full bg-gray-200"></div>
          <IoIosSearch fontSize={22} className="my-auto mx-3 text-gray-400" />
        </div>
      </div>
      <div
        className={clsx(
          `
          flex 
          justify-end 
          w-[280px]
        `,
          user && 'gap-8',
          !user && 'gap-4'
        )}
      >
        <Button
          onClick={() => {
            user ? navigate('/upload') : navigate('/login');
          }}
          icon={<FaPlus className="my-auto" />}
          secondary={true}
          className=" rounded-[2px] px-1 py-1 max-w-[115px]"
        >
          Upload
        </Button>
        {!user && (
          <Button href="/login" className=" rounded-[2px] px-1 py-1 w-[100px]">
            Login
          </Button>
        )}
        {!user && (
          <div>
            <FaEllipsisVertical className="h-full py-2" />
          </div>
        )}

        {user && (
          <div className="flex gap-5">
            <FiSend fontSize={28} className="my-auto" />
            <RiMessageLine fontSize={28} className="my-auto" />
            <div className="min-w-8 max-w-8 h-8 ">
              <img
                src={user.avatarData.url || ''}
                alt="User avatar"
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
