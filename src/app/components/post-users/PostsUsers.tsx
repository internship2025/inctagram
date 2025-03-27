"use client";

import PostUser from "./PostUser";
import s from "./postsUser.module.css";

export type PostsUserType = {
  setIsmodal: (isVal: boolean) => void;
  posts: Array<{
    id: number;
    userName: string;
    description: string;
    location: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
      uploadId: string;
    }>;
    createdAt: string;
    updatedAt: string;
    ownerId: number;
    avatarOwner: string;
    owner: {
      firstName: string;
      lastName: string;
    };
    likesCount: number;
    isLiked: boolean;
    avatarWhoLikes: boolean;
  }>;
};

const PostsUser = ({ setIsmodal, posts }: PostsUserType) => {
 console.log(posts)
  return (
    <div className={s.wrapper}>
      {posts.map((it) => {
        return <PostUser key = {it.id}  setIsmodal={setIsmodal} postImg={it.images[0]?.url} />;
      })}
    </div>
  );
};

export default PostsUser;
