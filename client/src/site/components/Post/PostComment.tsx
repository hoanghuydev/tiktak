import Comment from '@/components/Comment';
import CommentService from '@/features/comment/commentService';
import { CommentModel } from '@/models/comment';
import { getPostSelector } from '@/redux/selector';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const PostComment = () => {
  const [miniTab, setMiniTab] = useState<'comments' | 'creator-videos'>(
    'comments'
  );
  const post = useSelector(getPostSelector);
  const [comments, setComments] = useState<CommentModel[]>([]);
  useEffect(() => {
    const getComments = async (postId: number) => {
      await CommentService.getCommentsByPostId(postId).then((resp) => {
        setComments(resp.comments);
      });
    };
    if (post && miniTab == 'comments' && comments.length == 0) {
      getComments(post.id!);
    }
  }, [miniTab, post]);
  return (
    <div className="px-1">
      <Tabs animated defaultActiveKey="comments" className="w-full">
        <TabPane
          className="w-full p-3"
          tab={<p className="text-center font-semibold px-5">Comments</p>}
          key="comments"
        >
          {comments.map((comment) => (
            <Comment comment={comment} className="mb-6" />
          ))}
        </TabPane>

        <TabPane
          className="w-full"
          tab={
            <p className="text-center font-semibold  px-5">Creator videos</p>
          }
          key="creator-videos"
        >
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PostComment;
