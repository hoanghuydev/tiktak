import Comment from '@/components/Comment';
import Loading from '@/components/Loading';
import PostSmall from '@/components/PostSmall';
import CommentService from '@/features/comment/commentService';
import { getCommentsByPostId } from '@/features/comment/commentSlice';
import PostService from '@/features/post/postService';
import { CommentModel } from '@/models/comment';
import { PostModel } from '@/models/post';
import { getCommentsSelector, getPostSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { Spin, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const PostComment = () => {
  const [miniTab, setMiniTab] = useState<'comments' | 'creator-videos'>(
    'comments'
  );
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const post = useSelector(getPostSelector);
  const comments = useSelector(getCommentsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeMiniTab = (key: string) => {
    setMiniTab(key as typeof miniTab);
    if (post && key == 'comments' && comments.length == 0) {
      setLoading(true);
      dispatch(getCommentsByPostId(post.id));

      setLoading(false);
    } else if (key == 'creator-videos' && posts.length == 0) {
      setLoading(true);
      PostService.getPostsByUserId(post.poster!).then((resp) => {
        setPosts(resp.posts);
        setLoading(false);
      });
    }
  };

  return (
    <div className="px-1">
      <Tabs
        animated
        activeKey={miniTab}
        onChange={handleChangeMiniTab}
        className="w-full"
      >
        <TabPane
          className="w-full p-3"
          tab={
            <p
              className="text-center font-semibold px-5"
              onClick={() => {
                setMiniTab('comments');
              }}
            >
              Comments
            </p>
          }
          key="comments"
        >
          {loading && <Loading />}
          {!loading &&
            comments.length != 0 &&
            comments.map((comment) => (
              <Comment comment={comment} key={comment.id} className="mb-6" />
            ))}
        </TabPane>

        <TabPane
          className="w-full"
          tab={
            <p
              className="text-center font-semibold px-5"
              onClick={() => {
                setMiniTab('creator-videos');
              }}
            >
              Creator videos
            </p>
          }
          key="creator-videos"
        >
          {loading && <Loading />}
          {!loading && posts && (
            <div className="mb-5 overflow-y-auto creator-video-container">
              <div className="grid gap-x-6 gap-y-4 px-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
                {posts.map((postDetail, index) => (
                  <PostSmall
                    className={`max-w-[200px]  creator-videos-${postDetail.id}`}
                    key={index}
                    post={postDetail}
                    isPlaying={postDetail.id === post.id}
                  />
                ))}
              </div>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PostComment;
