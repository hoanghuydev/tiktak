import React, { useEffect, useState } from 'react';
import Image404 from '@/assets/404.svg';
import { Spin } from 'antd';
const Page404 = () => {
  const [show404, setShow404] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow404(true), 1000);
  }, []);
  return (
    <div className="w-full h-screen flex">
      {show404 && <img src={Image404} alt="404" />}
      {!show404 && (
        <div className="m-auto">
          <Spin
            tip="Loading"
            size="large"
            className="h-fit w-fit text-gray-400"
          ></Spin>
        </div>
      )}
    </div>
  );
};

export default Page404;
