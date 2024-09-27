import PostService from '@/features/post/postService';
import { PostModel } from '@/models/post';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostInfo from './components/Post/PostInfo';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPostLoadingSelector,
  getPostSelector,
  postSliceSelector,
} from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { setPost } from '@/features/post/postSlice';
import PostComment from './components/Post/PostComment';
import CommentForm from './components/Post/CommentForm';
import clsx from 'clsx';

const Post = () => {
  let { postId } = useParams();
  const parsedPostId = parseInt(postId ?? '0', 10);
  const post = useSelector(getPostSelector);
  const postSlice = useSelector(postSliceSelector);
  const commentFormRef = useRef<HTMLDivElement | null>(null);
  const [paddingBottom, setPaddingBottom] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getPostInfoById = async (postId: number) => {
      setPost({} as PostModel);
      const resp = await PostService.getPostById(postId);
      dispatch(setPost(resp.post));
    };
    getPostInfoById(parsedPostId);
  }, [parsedPostId]);
  // Update paddingBottom when CommentForm change height
  useEffect(() => {
    const commentFormElement = commentFormRef.current;

    if (!commentFormElement) return;

    const resizeObserver = new ResizeObserver(() => {
      setPaddingBottom(commentFormElement.clientHeight);
    });

    resizeObserver.observe(commentFormElement);

    return () => {
      if (commentFormElement) {
        resizeObserver.unobserve(commentFormElement);
      }
    };
  }, []);

  return (
    <div className="h-full">
      {!postSlice?.isLoading && post && (
        <div className="flex h-full">
          {/* First row: video */}
          <div className="flex-[200%] flex bg-black">
            <video
              autoPlay
              loop
              className="object-cover object-center mx-auto"
              src={post?.videoUrl ?? ''}
            ></video>
          </div>

          {/* Second row: post details */}
          <div className="flex-[100%] h-full overflow-hidden relative bg-white flex-col min-w-[290px]">
            <div
              className={clsx('overflow-y-auto h-full')}
              style={{
                paddingBottom: `${paddingBottom}px`,
              }}
            >
              <PostInfo />
              <PostComment />
            </div>
            <CommentForm
              ref={commentFormRef}
              post={post}
              className="min-h-[85px] max-h-[166px] absolute left-0 right-0 bottom-0"
            />
          </div>
        </div>
      )}
      {!postSlice?.isLoading && !post && <div>Not found post</div>}
    </div>
  );
};

export default Post;
