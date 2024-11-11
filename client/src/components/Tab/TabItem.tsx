import React from 'react';

interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({
  label,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={`flex flex-col items-center justify-center cursor-pointer transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {icon}
      <p className="text-[12px] mt-1">{label}</p>
    </li>
  );
};

export default TabItem;
