import Button from '@/components/Button';
import { PostModel } from '@/models/post';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import VideoRecommendActions from './VideoRecommendActions';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoRecommendInfo from './VideoRecommendInfo';
import { Dispatch } from 'react';
import FollowService from '@/features/follow/followService';
import showToast from '@/utils/toast';
import { message } from 'antd';
import Video from '@/components/Video';
export interface VideoRecommendChildProps {
  post: PostModel;
  isFollow: boolean;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
  followUser: () => void;
  isFriend: boolean;
}
const VideoRecommend = ({ post }: { post: PostModel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFollow, setIsFollow] = useState<boolean>(post.isFollow!);
  const [isFriend, setIsFriend] = useState<boolean>(post.isFriend!);
  const [play, setPlay] = useState<boolean>(false);
  useEffect(() => {
    // Examine the video within the user's view
    let observer: IntersectionObserver | null;
    if (videoRef && videoRef.current) {
      const handleBeforeLeaveTab = () => {
        document.hidden ? videoRef.current?.pause() : videoRef.current?.play();
        observer = new IntersectionObserver(
          (entries) => {
            const video = videoRef.current;
            if (video) {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  if (!document.hidden) {
                    setPlay(true);
                    video.play();
                  }
                } else {
                  setPlay(false);
                  video.pause();
                }
              });
            }
          },
          { threshold: [0.6] }
        );
        observer.observe(videoRef.current!);
      };
      handleBeforeLeaveTab();
      document.addEventListener('visibilitychange', handleBeforeLeaveTab);
      return () => {
        if (videoRef?.current && observer) {
          observer.unobserve(videoRef.current);
        }
        document.removeEventListener('visibilitychange', handleBeforeLeaveTab);
      };
    }
  }, []);

  const followUser = async () => {
    if (!isFollow) {
      await FollowService.followUser(post.poster!)
        .then((data) => {
          setIsFollow(true);
        })
        .catch((err) => {
          message.error(err.response.data.mes);
        });
    } else {
      await FollowService.unfollowUser(post.poster!)
        .then((data) => {
          setIsFollow(false);
        })
        .catch((err) => {
          message.error(err.response.data.mes);
        });
    }
  };

  return (
    <div className="px-5 w-full flex" id={'post-' + post.id}>
      <div className="hidden md:flex min-w-[56px] max-w-[56px] h-[56px] rounded-full me-4 overflow-hidden">
        <Link to={'/profile/@' + post.posterData.userName}>
          <img
            src={post.posterData.avatarData.url || ''}
            className="w-full h-full object-cover"
            alt="User Data"
          />
        </Link>
      </div>
      <div className="flex-1">
        <VideoRecommendInfo
          followUser={followUser}
          post={post}
          isFollow={isFollow}
          isFriend={isFriend}
          setIsFollow={setIsFollow}
        />
        {/* Video */}
        <div className="flex mt-5">
          <Video
            videoRef={videoRef}
            videoUrl={post.videoUrl + ''}
            className="min-w-[43%] max-w-[90%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-[45%] min-h-[200px]"
          />
          <VideoRecommendActions
            followUser={followUser}
            post={post}
            isFollow={isFollow}
            isFriend={isFriend}
            setIsFollow={setIsFollow}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoRecommend;
