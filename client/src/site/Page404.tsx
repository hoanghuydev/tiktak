import React, { useEffect, useState } from 'react';
import Image404 from '@/assets/404.svg';
import { Spin } from 'antd';
import Loading from '@/components/Loading';
const Page404 = () => {
  const [show404, setShow404] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow404(true), 1000);
  }, []);
  return (
    <div className="w-full h-screen flex">
      {show404 && <img src={Image404} alt="404" />}
      {!show404 && <Loading />}
    </div>
  );
};

export default Page404;
