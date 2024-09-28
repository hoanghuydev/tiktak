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
  useEffect(() => {
    if (post && miniTab == 'comments' && comments.length == 0) {
      setLoading(true);
      dispatch(getCommentsByPostId(post.id));
      setLoading(false);
    } else if (miniTab == 'creator-videos' && posts.length == 0) {
      setLoading(true);
      PostService.getPostsByUserId(post.poster!).then((resp) => {
        setPosts(resp.posts);
        setLoading(false);
      });
    }
  }, [miniTab, post]);
  return (
    <div className="px-1">
      <Tabs animated defaultActiveKey="comments" className="w-full">
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
            <div className="flex mb-5">
              <div className="flex flex-wrap mx-auto gap-5 px-0 md:px-4 lg:px-6">
                {posts.map((post, index) => (
                  <PostSmall
                    className="mx-auto flex-grow flex-shrink max-w-[200px]"
                    key={index}
                    post={post}
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
