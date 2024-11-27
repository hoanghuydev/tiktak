import React, { useState } from 'react'
import type { UploadFile, UploadProps } from 'antd';

import UploadDragger from '../components/Upload/UploadDragger.tsx';
import { FaRegTrashAlt } from 'react-icons/fa';
import UploadForm from '../components/Upload/UploadForm.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { postUploadSelector } from '@/redux/selector.ts';
import { AppDispatch } from '@/redux/store.ts';
import { setPostUpload } from '@features/post/postSlice.ts';
const Upload  = () => {
  const dispatch = useDispatch<AppDispatch>()
  const postUpload = useSelector(postUploadSelector)
  const video = postUpload?.video
  return (
    <div className='bg-[#F8F8F8] min-h-dvh w-full flex justify-center'>
      {!video && <UploadDragger />}
      {video &&
        <div className='h-fit w-[90%] mt-5'>
          <div className='bg-white rounded-md p-6 shadow-sm'>
            <div className="flex justify-between">
              <p className="text-[24px] font-medium">Name of video.mp4</p>
              <FaRegTrashAlt fontSize={24} onClick={()=>{dispatch(setPostUpload({...postUpload,video : null}))}} />
            </div>
            <div className="flex gap-5 mt-2">
              <p>Size: <strong className='ms-3'>5.2 MB</strong></p>
              <p>Duration: <strong className='ms-3'>0m 15s</strong></p>
            </div>
          </div>
          <UploadForm/>
        </div>
      }
    </div>
  )
}

export default Upload