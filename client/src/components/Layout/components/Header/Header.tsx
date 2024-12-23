import React, { useEffect, useState } from 'react';
import { FaEllipsisVertical, FaPlus } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import TiktokLogo from '@/assets/tiktok-logo.svg';
import { TbPointFilled } from 'react-icons/tb';
import Button from '@/components/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentUserSelector, tabSelector } from '@/redux/selector';
import { FiSend } from 'react-icons/fi';
import { RiMessageLine } from 'react-icons/ri';
import clsx from 'clsx';
import SearchForm from '@/components/SearchForm';
import HeaderPopupSetting from './HeaderPopupSetting';

const Header = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(currentUserSelector);
  const currentTab = useSelector(tabSelector);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const query = searchParams.get('q');
    setSearchText(query ?? '');
  }, [searchParams]);

  return (
    <header className="h-[60px] bg-white justify-between shadow-sm flex items-center ps-4 pe-6 border-b-[1px] border-b-gray-200">
      <div className="logo w-[280px]">
        <a href="/">
          <img src={TiktokLogo} width="110px" alt="Tiktok logo" />
        </a>
      </div>
      <div className="flex-1 me-2 hidden md:flex max-w-[500px] ">
        <SearchForm isGray query={searchText} />
      </div>
      <div
        className={clsx(`flex justify-end w-[280px]`, user ? 'gap-8' : 'gap-4')}
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
          <div className="flex gap-5 ">
            <Link to={'/messages'}>
              <FiSend fontSize={28} className="my-auto" />
            </Link>
            <Link to={'/notify'}>
              <RiMessageLine fontSize={28} className="my-auto" />
            </Link>
            <div
              className="min-w-8 max-w-8 h-8 relative "
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Link to={`/profile/@${user.userName}`}>
                <img
                  src={user.avatarData.url || ''}
                  alt="User avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </Link>
              {isHovered && <HeaderPopupSetting />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
