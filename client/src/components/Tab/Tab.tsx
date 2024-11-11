import React, { useState } from 'react';
import TabItem from './TabItem';
import clsx from 'clsx';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  defaultActiveId?: string;
  tabVertical?: boolean;
  tabItemVertical?: boolean;
}

const Tab: React.FC<TabProps> = ({
  items,
  tabVertical,
  tabItemVertical,
  defaultActiveId,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveId ?? items[0].id
  );

  return (
    <div className={clsx('flex w-full', tabVertical && 'flex-col')}>
      <div className="rounded-md overflow-y-auto bg-white p-4 shadow-md">
        <ul className={clsx('space-y-2 flex', tabItemVertical && 'flex-col')}>
          {items.map((item) => (
            <TabItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={item.id === activeTab}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </ul>
      </div>
      <div className="flex-1 rounded-md bg-white shadow-md p-4 ml-4">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tab;
