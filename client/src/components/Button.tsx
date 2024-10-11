import React, { CSSProperties, StyleHTMLAttributes } from 'react';
import clsx from 'clsx';
import { ButtonHTMLType, ButtonType } from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
interface ButtonProps {
  text?: string;
  type?: ButtonHTMLType;
  id?: string;
  onClick?: () => void;
  disabled?: boolean;
  secondary?: boolean;
  outline?: boolean;
  children?: React.ReactNode;
  fullWitdth?: boolean;
  danger?: boolean;
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  setWidth?: boolean;
  outlineBlack?: boolean;
  style?: CSSProperties;
  bgGray?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  type,
  id,
  onClick,
  disabled,
  secondary,
  outline,
  children,
  fullWitdth,
  danger,
  className,
  href,
  icon,
  setWidth,
  outlineBlack,
  style,
  bgGray,
}) => {
  const navigate = useNavigate();
  return (
    <button
      style={style}
      onClick={href ? () => navigate(href) : onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
            flex
            justify-center
            rounded-md
            p-3
            font-bold
            text-[16px]
            hover:cursor-pointer
            gap-3
        `,
        !setWidth && 'w-full',
        disabled && 'opacity-70 cursor-default',
        fullWitdth && 'w-full',
        secondary && 'text-color border-[1px] border-[#1618231f]',
        outline &&
          'text-primary bg-transparent border-[1px] border-[#f42750] hover:bg-[#f4275013]',
        outlineBlack &&
          'text-color bg-transparent border-[1px] border-[#1618231f] hover:bg-[#f8f8f8]',
        danger && 'bg-rose-600 hover:bg-rose-500',
        !secondary &&
          !danger &&
          !outline &&
          'hover:bg-[#f42750] bg-[#FE2C55] hover:hover:bg-gradient-to-r hover:from-transparent hover:via-transparent hover:to-transparent hover:to-red-500 text-white',
        bgGray && 'bg-[#0000000d]',
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
