import clsx from 'clsx';
import React from 'react';
interface ButtonActionPostProps {
  icon: React.ReactNode;
  count: number;
  onClick?: () => void;
  postId: number;
  className?: string;
}
const ButtonActionPost = ({
  icon,
  count,
  onClick,
  postId,
  className,
}: ButtonActionPostProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <div
        className="min-w-10 mx-auto max-w-10 h-10 md:min-w-12 md:max-w-12 md:h-12  hover:cursor-pointer hover:opacity-90 rounded-full flex bg-gray-200"
        onClick={onClick}
      >
        {icon}
      </div>
      <p className="text-[13px] mx-auto text-center font-bold text-[#161823bf]">
        {count}
      </p>
    </div>
  );
};

export default ButtonActionPost;
