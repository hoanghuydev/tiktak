import React, { Dispatch, SetStateAction } from 'react';
import {
  GetProp,
  message,
  UploadFile,
  Upload as UploadFileComponent,
  UploadProps,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { IoMdCloudUpload } from 'react-icons/io';
import { LiaPhotoVideoSolid } from 'react-icons/lia';
import Button from '@/components/Button';
import { IoVideocamOutline } from 'react-icons/io5';
import { LuFileVideo } from 'react-icons/lu';
import { MdAspectRatio } from 'react-icons/md';
import UploadRequirement from './UploadRequirement';
import showToast from '@/utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { postUploadSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { setPostUpload } from '@/features/post/postSlice';
const { Dragger } = UploadFileComponent;

const UploadDragger = () => {
  const dispatch = useDispatch<AppDispatch>();
  const postUpload = useSelector(postUploadSelector);
  const props: UploadProps = {
    name: 'file',
    accept: 'video/mp4,video/mov',
    beforeUpload: (file) => {
      return false;
    },
    onChange(info) {
      const isMp4OrMov =
        info.file.type === 'video/mp4' || info.file.type === 'video/mov';
      if (!isMp4OrMov) {
        message.error('You can only upload MP4/MOV video file!');
      }
      const isLt2M = info.file.size! / 1024 / 1024 < 80;
      if (!isLt2M) {
        message.error('Video must smaller than 80MB!');
      }
      if (isLt2M && isMp4OrMov && postUpload) {
        dispatch(
          setPostUpload({
            thumnail: postUpload?.thumnail,
            title: postUpload?.title,
            visibility: postUpload?.visibility,
            video: info.fileList[info.fileList.length - 1],
          })
        );
      }
    },
  };
  return (
    <div className="flex  items-center flex-col mt-5 w-[90%] mx-auto">
      <div className="flex flex-col p-8 bg-white shadow-custom rounded-md md:h-[80%] w-full">
        <Dragger {...props} className="w-full flex-1">
          <p className="ant-upload-drag-icon flex">
            <IoMdCloudUpload className="mx-auto text-[#A8A8A8]" fontSize={70} />
          </p>
          <p className="font-bold text-[24px]">Select videos to upload</p>
          <p className="text-[16px] font-semibold text-[#A8A8A8]">
            Or drag and drop them here. You can upload up to 30 videos.
          </p>
          <Button className="max-w-[150px] mx-auto mt-4 px-2 py-2">
            Select videos
          </Button>
        </Dragger>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-between mt-5">
          <UploadRequirement
            icon={
              <IoVideocamOutline className="text-[#A8A8A8]" fontSize={30} />
            }
            title="Size and duration"
            description="Maximum size: 80 MB, video duration: 1 minutes."
          />
          <UploadRequirement
            icon={<LuFileVideo className="text-[#A8A8A8]" fontSize={30} />}
            title="File formats"
            description="Recommended: “.mp4”. Support format : mp4,mov."
          />
          <UploadRequirement
            icon={
              <LiaPhotoVideoSolid className="text-[#A8A8A8]" fontSize={30} />
            }
            title="Video resolutions"
            description="Minimum resolution: 720p. 2K and 4K are supported."
          />
          <UploadRequirement
            icon={<MdAspectRatio className="text-[#A8A8A8]" fontSize={30} />}
            title="Aspect ratios"
            description="Recommended: 16:9 for landscape, 9:16 for vertical."
          />
        </div>
      </div>
    </div>
  );
};

export default UploadDragger;
