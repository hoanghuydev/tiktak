import { PostModel } from '@/models/post';
import React from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Post = ({ post }: { post: PostModel }) => {
  return (
    <div className="hover:cursor-pointer hover:opacity-95 rounded-sm rounded-lg overflow-hidden max-w-[370px] min-w-[150px] relative">
      <div className="pt-[132%]">
        <Link to={`/post/${post.id}`}>
          <div className="absolute inset-0">
            <img
              src={`https://drive.google.com/thumbnail?id=${post.thumnailId}&sz=w1000`}
              alt="Image Description"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="absolute flex flex-col-reverse  bottom-0 w-full h-[60px] black-to-transparent-bottom">
            <span className="flex mb-[3px] ms-1 gap-1 text-white">
              <IoPlayOutline size={18} className="my-auto" />
              <p className="my-auto text-white"> {post.views}</p>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Post;
