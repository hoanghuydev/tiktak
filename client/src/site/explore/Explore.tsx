import React, { useEffect } from 'react';

const Explore = () => {
  useEffect(() => {
    document.title = 'Explore - Find your favourite videos on TikTok';
  }, []);
  return <div>Explore</div>;
};

export default Explore;
