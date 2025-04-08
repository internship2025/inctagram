"use client";
import Link from "next/link";
import Image from "next/image";
import s from "./postsUser.module.css";
import { PostDetailsResponse } from "@/features/home-page/ui/user-profile/api/types";

type PostsUsersProps = {
  posts: PostDetailsResponse[];
};

export const PostsUser = ({ posts }: PostsUsersProps) => {
  return (
    <div className={s.postsGrid}>
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className={s.postItem}>
          <div className={s.imageContainer}>
            <Image
              src={post.images[0]?.url}
              alt={post.description || "Post image"}
              fill
              className={s.postImage}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
