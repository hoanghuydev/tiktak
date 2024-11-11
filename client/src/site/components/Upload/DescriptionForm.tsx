import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
import { setPostUpload } from '@/features/post/postSlice';
import { postUploadSelector } from '@/redux/selector';
import ThumnailUpload from './ThumnailUpload';

const DescriptionForm = ({ videoUrl }: { videoUrl: string }) => {
  const dispatch = useDispatch();
  const postUpload = useSelector(postUploadSelector);
  const title = postUpload?.title || '';

  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000 && postUpload) {
      dispatch(
        setPostUpload({
          ...postUpload,
          title: value,
        })
      );
    }
  };

  const handleChangeVisibility = (value: 0 | 1 | -1) => {
    if (postUpload)
      dispatch(
        setPostUpload({
          ...postUpload,
          visibility: value,
        })
      );
  };

  return (
    <form className="flex-1">
      <div>
        <label htmlFor="title" className="font-semibold">
          Description
        </label>
        <div className="rounded-md bg-[#F8F8F8] p-5 w-full mt-2">
          <textarea
            value={title}
            onChange={handleChangeTitle}
            id="title"
            name="title"
            className="h-[70px] bg-transparent w-full outline-none border-none"
            placeholder="Share more about video here..."
          ></textarea>
          <div className="flex justify-end">
            <p className="text-gray-400 font-light">{title.length}/1000</p>
          </div>
        </div>
      </div>
      <ThumnailUpload videoUrl={videoUrl} />
      <div>
        <p className="my-auto font-semibold mt-5 mb-3">
          Who can watch this video
        </p>
        <Select
          defaultValue={1}
          style={{ width: 250 }}
          onChange={handleChangeVisibility}
          options={[
            { value: -1, label: 'Only you' },
            { value: 0, label: 'Friends' },
            { value: 1, label: 'Everyone' },
          ]}
        />
      </div>
    </form>
  );
};

export default DescriptionForm;
