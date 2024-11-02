import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { CiImageOn } from 'react-icons/ci';

const ImageInput = () => {
  const [image, setImage] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex">
      <label className="my-auto">
        <Tooltip title="Click to send media">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <CiImageOn size={18} style={{ cursor: 'pointer' }} />
        </Tooltip>
      </label>
    </div>
  );
};

export default ImageInput;
