"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Loader } from "@/shared/ui/loader/Loader";
import { useAppSelector } from "@/services/store";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import s from "./userProfile.module.css";
import {
  GetPublicUserProfileResponse,
  PostsUserResponse,
} from "@/features/home-page/ui/user-profile/api/types";
import { useLazyGetPostsUserQuery } from "@/features/create-post/api/post.api";
import { PostsUser } from "@/features/home-page/ui/user-profile/ui/post-users/ui/postsUser/PostsUser";

interface UserProfileProps {
  data: GetPublicUserProfileResponse;
  initialPosts: PostsUserResponse;
  selectedPost?: any;
}

export const UserProfile = ({ data, initialPosts }: UserProfileProps) => {
  const [posts, setPosts] = useState(initialPosts.items);
  const [lastPostId, setLastPostId] = useState<number | null>(
    initialPosts.items[initialPosts.items.length - 1]?.id || null,
  );
  const { ref, inView } = useInView({ threshold: 0.5 });
  const totalPosts = initialPosts.totalCount;

  const [fetchPosts, { data: newPosts, isFetching, error }] =
    useLazyGetPostsUserQuery();

  const currentUserId = useAppSelector((state) => state.auth.userId);
  const isOwner = currentUserId === data.id;

  useEffect(() => {
    if (inView && !isFetching && posts.length < totalPosts) {
      fetchPosts({
        id: data.id,
        endCursorPostId: lastPostId,
      });
    }
  }, [inView, isFetching, data.id, lastPostId, totalPosts, posts.length]);

  useEffect(() => {
    if (newPosts?.items) {
      setPosts((prev) => {
        const newItems = newPosts.items.filter(
          (newPost) => !prev.some((post) => post.id === newPost.id),
        );
        return [...prev, ...newItems];
      });

      const newLastId = newPosts.items[newPosts.items.length - 1]?.id;
      if (newLastId) setLastPostId(newLastId);
    }
  }, [newPosts]);

  return (
    <div className={s.container}>
      {/* Секция профиля */}
      <div className={s.profileHeader}>
        {/* Аватар */}
        <div className={s.avatarWrapper}>
          <Image
            src={data.avatars[0]?.url || "/default-avatar.png"}
            alt="User avatar"
            width={150}
            height={150}
            className={s.avatar}
          />
        </div>

        {/* Информация профиля */}
        <div className={s.profileInfo}>
          <div className={s.nameBox}>
            <h1 className={s.username}>{data.userName}</h1>
            {isOwner && (
                 <Button
                 variant={"secondary"}
                 as={Link}
                 href= {`/profile/${data.id}/edit-profile`}
                 className={s.settingsButton}
               >
                 Profile Settings
               </Button>
            )}
          </div>

          {/* Статистика */}
          <div className={s.stats}>
            <div className={s.statItem}>
              <span className={s.statValue}>{data.userMetadata.following}</span>
              <span className={s.statLabel}>Following</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>{data.userMetadata.followers}</span>
              <span className={s.statLabel}>Followers</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>
                {data.userMetadata.publications}
              </span>
              <span className={s.statLabel}>Publications</span>
            </div>
          </div>

          {/* Биография */}
          <p className={s.bio}>{data.aboutMe || "No description provided"}</p>
        </div>
      </div>

      {/* Список постов */}
      <PostsUser posts={posts} />

      {/* Индикатор загрузки */}
      <div ref={ref} className={s.loaderContainer}>
        {isFetching && <Loader size="medium" />}
        {posts.length >= totalPosts && (
          <p className={s.endMessage}>All posts loaded ({totalPosts} total)</p>
        )}
      </div>
    </div>
  );
};
