import React from 'react';
import Header from './components/DefaultLayout/Header';
import Sidebar from './components/DefaultLayout/Sidebar';
import clsx from 'clsx';
export interface LayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

const DefaultLayout = ({ children, fullScreen }: LayoutProps) => {
  return (
    <div className={clsx(fullScreen ? 'h-dvh overflow-hidden' : 'h-full')}>
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <div className="w-full mt-5 mb-10">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
