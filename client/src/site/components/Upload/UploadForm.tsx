import React, { useEffect, useState } from 'react';
import { Modal, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  percentLoadingPostSelector,
  postSliceSelector,
  postUploadSelector,
} from '@/redux/selector';
import {
  setPercentLoading,
  setPostUpload,
  uploadPost,
} from '@/features/post/postSlice';
import { AppDispatch } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import ThumnailUpload from './ThumnailUpload';
import Button from '@/components/Button';
import CircularProgressModal from './CircularProgressModal';
import DescriptionForm from './DescriptionForm';
import VideoUploadPreview from './VideoUploadPreview';

const UploadForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showModalUploading, setShowModalUploading] = useState(false);
  const postUpload = useSelector(postUploadSelector);
  const percentUploading = useSelector(percentLoadingPostSelector);
  const postSlice = useSelector(postSliceSelector);
  const video = postUpload?.video;
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState<string>('');
  useEffect(() => {
    if (video && video.originFileObj) {
      const url = URL.createObjectURL(video.originFileObj);
      setVideoUrl(url);
    }
  }, [video]);

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

  useEffect(() => {
    if (
      ![99, 100].includes(percentUploading) &&
      showModalUploading &&
      postSlice?.isLoading
    ) {
      setTimeout(() => {
        dispatch(setPercentLoading(percentUploading + 1));
      }, 100);
    }
    if (percentUploading === 100) {
      if (postSlice?.isSuccess) {
        navigate('/');
      } else if (postSlice?.isError) {
        setShowModalUploading(false);
        setPercentLoading(0);
      }
    }
  }, [
    percentUploading,
    showModalUploading,
    postSlice?.isError,
    postSlice?.isSuccess,
    postSlice?.isLoading,
  ]);

  return (
    <div className="bg-white rounded-md p-6 mt-3 shadow-sm">
      <div className="flex flex-col md:flex-row">
        <DescriptionForm videoUrl={videoUrl} />
        <VideoUploadPreview videoUrl={videoUrl} />
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
      <CircularProgressModal
        visible={showModalUploading}
        closeModal={() => setShowModalUploading(false)}
        percentUploading={percentUploading}
      />
    </div>
  );
};

export default UploadForm;
