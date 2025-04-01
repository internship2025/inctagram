"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { PostsUserResponse, useGetPostsUserQuery } from "@/features/auth/api/auth.api";
import s from './userProfile.module.css';
import { PostsUser } from "../post-users/PostsUsers";
import { Loader } from "@/shared/ui/loader/Loader";
import { useAppSelector } from "@/services/store";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";

interface UserProfileProps {
  data: {
    id: number;
    userName: string;
    aboutMe: string;
    avatars: Array<{
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
    }>;
    userMetadata: {
      following: number;
      followers: number;
      publications: number;
    };
  };
  initialPosts: PostsUserResponse;
}

export const UserProfile = ({ data, initialPosts }: UserProfileProps) => {
  const [posts, setPosts] = useState(initialPosts.items);
  const [nextCursor, setNextCursor] = useState(initialPosts.nextCursor);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { data: newPosts, isFetching, error } = useGetPostsUserQuery(
    { id: data.id, endCursorPostId: nextCursor },
    { skip: !nextCursor }
  );

  const currentUserId = useAppSelector((state) => state.auth.userId);
  const isOwner = currentUserId === data.id;

  useEffect(() => {
    if (inView && nextCursor && !isFetching) {
      setNextCursor(newPosts?.nextCursor || null);
    }
  }, [inView, isFetching]);

  useEffect(() => {
    if (newPosts) {
      setPosts((prev) => [...prev, ...newPosts.items]);
    }
  }, [newPosts]);

  if (error) {
    return (
      <div className={s.errorContainer}>
        Failed to load posts. Please try again later.
      </div>
    );
  }

  return (
    <div className={s.container}>
      {/* Profile Header */}
      <div className={s.profileHeader}>
        <div className={s.avatarWrapper}>
          <Image
            src={data.avatars[0]?.url || "/default-avatar.png"}
            alt="User avatar"
            width={150}
            height={150}
            className={s.avatar}
          />
        </div>

        <div className={s.profileInfo}>
        <div className={s.nameBox}>
          <h1 className={s.username}>{data.userName}</h1>
          {isOwner && (
            <Button
              variant={'secondary'}
              as={Link}
              href="/settings/profile"
              className={s.settingsButton}
            >
              Profile Settings
            </Button>
          )}
        </div>

          <div className={s.stats}>
          <div className={s.statItem}>
              <span className={s.statValue}>
                {data.userMetadata.following}
              </span>
              <span className={s.statLabel}>Following</span>
            </div>
            <div className={s.statItem}>
              <span className={s.statValue}>
                {data.userMetadata.followers}
              </span>
              <span className={s.statLabel}>Followers</span>
            </div>
            
            <div className={s.statItem}>
              <span className={s.statValue}>
                {data.userMetadata.publications}
              </span>
              <span className={s.statLabel}>Publications</span>
            </div>
          </div>

          <p className={s.bio}>{data.aboutMe || "No description provided"}</p>
        </div>
      </div>

      {/* Posts Grid */}
      <PostsUser posts={posts} />

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className={s.loaderContainer}>
  {isFetching ? (
    <Loader size="medium" />
  ) : nextCursor ? (
    <span className={s.scrollPrompt}>Scroll to load more</span>
  ) : (
    <>
      <p className={s.endMessage}>No more posts to show.</p>
      
    </>
  )}
</div>
    </div>
  );
};