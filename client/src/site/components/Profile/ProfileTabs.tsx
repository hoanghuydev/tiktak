import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { IoHeartDislikeOutline } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import Post from '@/components/Post';
import PostService from '@/features/post/postService';
import { PostModel } from '@/models/post';
const ProfileTabs = ({ userId }: { userId: number }) => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    PostService.getPostsByUserId(userId).then((resp) => setPosts(resp.posts));
  }, []);
  return (
    <Tabs animated defaultActiveKey="videos">
      <TabPane
        tab={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <CgMenuGridO size={20} className="my-auto" />
            <span style={{ marginLeft: 8 }}>Videos</span>
          </span>
        }
        key="videos"
      >
        {!loading && posts && (
          <div className="flex flex-wrap justify-center gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        )}
      </TabPane>

      <TabPane
        className="flex flex-col"
        tab={
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <IoHeartDislikeOutline size={20} className="my-auto" />
            <span style={{ marginLeft: 8 }}>Likes</span>
          </span>
        }
        key="likes"
      >
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
};

export default ProfileTabs;
