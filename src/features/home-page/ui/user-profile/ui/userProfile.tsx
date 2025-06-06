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
import { toast } from "sonner";
import { PostItem } from "@/features/create-post/api/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Post } from "@/features/auth/ui/posts/Post/post";
import { Modal } from "@/shared/ui/modal/modal";

interface UserProfileProps {
  data: GetPublicUserProfileResponse;
  initialPosts: PostsUserResponse;
  selectedPost: PostItem | null;
}

export const UserProfile = ({ data, initialPosts }: UserProfileProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  const [posts, setPosts] = useState(initialPosts.items);
  const [lastPostId, setLastPostId] = useState<number | null>(
    initialPosts.items[initialPosts.items.length - 1]?.id || null,
  );
  const { ref, inView } = useInView({ threshold: 0.5 });
  const totalPosts = initialPosts.totalCount;
  const [hasError, setHasError] = useState(false);

  const [fetchPosts, { data: newPosts, isFetching, error }] =
    useLazyGetPostsUserQuery();

  const currentUserId = useAppSelector((state) => state.auth.userId);
  const isOwner = currentUserId === data.id;

  // Ловим ошибку загрузки постов
  useEffect(() => {
    if (error) {
      toast.error("Failed to load posts. Check your internet connection.");
      setHasError(true);
    }
  }, [error]);

  useEffect(() => {
    if (inView && !isFetching && !hasError && posts.length < totalPosts) {
      fetchPosts({
        id: data.id,
        endCursorPostId: lastPostId,
      });
    }
  }, [
    inView,
    isFetching,
    hasError,
    data.id,
    lastPostId,
    totalPosts,
    posts.length,
    fetchPosts,
  ]);

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

  const handlePostClick = (postId: number) => {
    router.push(`/profile/${data.id}?postId=${postId}`, { scroll: false });
  };

  const handleCloseModal = () => {
    router.push(`/profile/${data.id}`, { scroll: false });
  };

  const selectedPost = postId
    ? posts.find((post) => post.id === Number(postId))
    : null;

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
                href={`/profile/${data.id}/edit-profile`}
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
      <PostsUser posts={posts} onPostClick={handlePostClick} />

      {/* Индикатор загрузки */}
      <div ref={ref} className={s.loaderContainer}>
        {isFetching && <Loader size="medium" />}
        {posts.length >= totalPosts && (
          <p className={s.endMessage}>All posts loaded ({totalPosts} total)</p>
        )}
      </div>
      {selectedPost && (
        <Modal open={true} onClose={handleCloseModal} isClose={true}>
          <Post
            post={selectedPost}
            avatar={data.avatars[0]?.url || "/default-avatar.png"}
            username={data.userName}
            isOwner={isOwner}
            onPostDeleted={(deletedPostId) => {
              setPosts(posts.filter((post) => post.id !== deletedPostId));
              handleCloseModal();
            }}
            userId={currentUserId || 0}
          />
        </Modal>
      )}
    </div>
  );
};
