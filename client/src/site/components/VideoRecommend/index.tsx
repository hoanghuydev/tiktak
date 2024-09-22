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
    <article
      className="snap-always snap-start-center px-5 md:pe-[15vw] w-fit  flex my-3 mx-auto"
      id={'post-' + post.id}
    >
      <div className="hidden md:flex md:min-w-[45px] md:max-w-[45px] md:h-[45px] lg:min-w-[56px] lg:max-w-[56px] lg:h-[56px] rounded-full me-4 overflow-hidden">
        <Link to={'/profile/@' + post.posterData.userName}>
          <img
            src={post.posterData.avatarData.url || ''}
            className="w-full h-full object-cover"
            alt="User Data"
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <VideoRecommendInfo
          followUser={followUser}
          post={post}
          isFollow={isFollow}
          isFriend={isFriend}
          setIsFollow={setIsFollow}
        />
        {/* Video */}
        <div className="flex mx-auto mt-5 h-[calc(100vh-170px)]">
          <Video
            videoRef={videoRef}
            videoUrl={post.videoUrl + ''}
            className="h-full aspect-[9/16]"
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
    </article>
  );
};

export default VideoRecommend;
