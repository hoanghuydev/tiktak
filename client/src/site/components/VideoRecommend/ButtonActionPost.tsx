import clsx from 'clsx';
import React from 'react';
interface ButtonActionPostProps {
  icon: React.ReactNode;
  count?: number;
  onClick?: () => void;
  postId: number;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}
const ButtonActionPost = ({
  icon,
  count,
  onClick,
  postId,
  className,
  iconClassName,
  textClassName,
}: ButtonActionPostProps) => {
  return (
    <div className={clsx('flex', className)}>
      <div
        className={clsx(
          'hover:cursor-pointer hover:opacity-90 rounded-full flex bg-gray-200',
          iconClassName
        )}
        onClick={onClick}
      >
        {icon}
      </div>
      <p
        className={clsx(
          'text-[13px] mx-auto text-center font-bold text-[#161823bf]',
          textClassName
        )}
      >
        {count}
      </p>
    </div>
  );
};

export default ButtonActionPost;
