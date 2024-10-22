import React, { useState, useEffect, useRef } from 'react';
import { SlOptions } from 'react-icons/sl';
import ModalOptionMessage from './ModalOptionMessage';

const MessageItem: React.FC = () => {
  const [isShowOptionsMenu, setIsShowOptionsMenu] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Function to handle click events outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsShowOptionsMenu(false);
        setIsHovered(false);
      }
    };

    if (isShowOptionsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowOptionsMenu]);

  // Toggle modal visibility when clicking the icon
  const toggleOptionsMenu = () => {
    if (!isShowOptionsMenu) setIsHovered(true);
    setIsShowOptionsMenu((prev) => !prev);
  };

  return (
    <div
      className="parent-div flex items-center h-[76px] relative hover:bg-[#16182308] px-6 hover:cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isShowOptionsMenu) setIsHovered(false);
      }}
    >
      <div className="min-w-14 max-w-14 h-14">
        <img
          src="http://res.cloudinary.com/dwuypueso/image/upload/v1719968242/tiktok_avatar/vb3lsu3tj5l2isahmfi7.jpg"
          className="w-full h-full object-cover object-center rounded-full"
          alt="User Avatar"
        />
      </div>
      <div className="pl-3">
        <p className="text-[16px] font-semibold text-ellipsis overflow-hidden line-clamp-1">
          nhỏ khó ở
        </p>
        <p className="flex flex-nowrap">
          <span className="text-ellipsis text-[14px] text-[#161823bf] overflow-hidden line-clamp-1">
            Mình gửi bạn bản tham khảo về giá nha
          </span>
          <span className="text-[14px] font-thin">10/5/2024</span>
        </p>
      </div>
      <div className="absolute w-6 h-6 top-6 right-4" ref={modalRef}>
        {isHovered && (
          <SlOptions
            size={16}
            onClick={toggleOptionsMenu}
            className="hover-show-icon cursor-pointer"
          />
        )}
        <div className="relative">
          {isShowOptionsMenu && <ModalOptionMessage />}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
