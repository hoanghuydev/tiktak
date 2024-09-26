import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
  return (
    <div className="m-auto flex place-items-center w-full h-screen">
      <Spin
        tip="Loading"
        size="large"
        className="h-fit w-fit m-auto text-gray-400"
      ></Spin>
    </div>
  );
};

export default Loading;
