import clsx from 'clsx';
import React from 'react';
import { LayoutProps } from './DefaultLayout';

const EmptyLayout = ({ children, fullScreen }: LayoutProps) => {
  return (
    <div className={clsx(fullScreen ? 'h-dvh overflow-hidden' : 'h-full')}>
      {children}
    </div>
  );
};

export default EmptyLayout;
