import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Select,
  message,
  type UploadFile,
  type UploadProps,
} from 'antd';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  percentLoadingPostSelector,
  postSliceSelector,
  postUploadSelector,
} from '@/redux/selector';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { AppDispatch } from '@/redux/store';
import {
  setPercentLoading,
  setPostUpload,
  uploadPost,
} from '@/features/post/postSlice';
import ThumnailUpload from './ThumnailUpload';
import Button from '@/components/Button';
import { PostUploadModel } from '@/models/postUpload';
import { axiosToken } from '@/axios';
import { IoClose } from 'react-icons/io5';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
const UploadForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModalUploading, setShowModalUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const postSlice = useSelector(postSliceSelector);
  const postUpload = useSelector(postUploadSelector);
  const percentUploading = useSelector(percentLoadingPostSelector);
  const video = postUpload?.video;
  const title = postUpload?.title || '';
  const showModal = () => {
    setShowModalUploading(true);
  };
  const closeModal = () => {
    setShowModalUploading(false);
  };
  useEffect(() => {
    if (video && video.originFileObj) {
      const url = URL.createObjectURL(video.originFileObj);
      setVideoUrl(url);
    }
  }, []);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000 && postUpload) {
      dispatch(
        setPostUpload({
          thumnail: postUpload?.thumnail,
          title: value,
          visibility: postUpload?.visibility,
          video: postUpload?.video,
        })
      );
    }
  };
  const handleChangeVisibility = (value: 0 | 1 | -1) => {
    if (postUpload)
      dispatch(
        setPostUpload({
          thumnail: postUpload?.thumnail,
          title: postUpload.title,
          visibility: value,
          video: postUpload?.video,
        })
      );
  };
  useEffect(() => {
    if (
      ![99, 100].includes(percentUploading) &&
      showModalUploading &&
      postSlice?.isLoading
    ) {
      setTimeout(() => {
        dispatch(setPercentLoading(percentUploading + 1));
      }, 40);
    }
    // if ((postSlice?.isSuccess || postSlice?.isError) && showModalUploading) {
    //   setShowModalUploading(false);
    // }
  }, [
    percentUploading,
    showModalUploading,
    postSlice?.isError,
    postSlice?.isSuccess,
    postSlice?.isLoading,
  ]);
  const handleUploadPost = () => {
    if (postUpload?.title) {
      const videoFile = postUpload.video?.originFileObj;
      const thumbnailFile = postUpload.thumnail?.originFileObj;
      if (videoFile) {
        setShowModalUploading(true);
        const postFormData = new FormData();
        postFormData.append('video', videoFile);
        postFormData.append('title', postUpload.title);
        postFormData.append('visibility', postUpload.visibility + '');
        if (thumbnailFile) postFormData.append('thumnail', thumbnailFile);
        dispatch(uploadPost(postFormData));
      } else message.error('Missing video file, please try again');
    } else {
      message.error('Please enter a title');
    }
  };
  return (
    <div className="bg-white rounded-md p-6 mt-3 shadow-sm">
      <div className="flex flex-col md:flex-row">
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
              className=""
              onChange={handleChangeVisibility}
              options={[
                { value: -1, label: 'Only you' },
                { value: 0, label: 'Friends' },
                { value: 1, label: 'Everyone' },
              ]}
            />
          </div>
          <div className="my-8">
            <Button
              onClick={handleUploadPost}
              type="button"
              className="max-w-[110px]"
            >
              Post
            </Button>
          </div>
        </form>
        <div className="ms-0 md:ms-10">
          <p className="font-bold mb-5">Preview</p>
          <video
            controls
            preload="auto"
            className="h-[300px] md:h-[unset] md:w-[200px] lg:w-[300px] rounded-md"
            src={videoUrl}
          ></video>
        </div>
      </div>
      <Modal
        open={showModalUploading}
        onOk={closeModal}
        onCancel={closeModal}
        footer={() => <div></div>}
        closeIcon={<IoClose fontSize={32} />}
        width={'fit-content'}
        centered
      >
        <div className="flex flex-col">
          <div className="min-w-[90px] max-w-[90px] h-[90px] rounded-full mx-auto">
            <CircularProgressbar
              value={percentUploading}
              text={`${percentUploading}%`}
              strokeWidth={5}
              styles={buildStyles({
                textColor: '#828282',
                textSize: 18,
                pathColor: '#f42750',
              })}
            />
          </div>
          <p className="font-semibold text-center mt-5">Posting...</p>
          <p className="text-center w-[220px]">
            Leaving the page does not interrupt the posting process
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UploadForm;
