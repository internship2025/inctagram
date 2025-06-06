import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";
import s from "./post.module.css";
import { Carousel } from "@/shared/ui/carousel/carousel";
import { PostMenu } from "@/features/auth/ui/posts/PostMenu/postMenu";
import { AvatarSimple } from "@/shared/ui/avatarSimple/avatarSimple";
import Image from "next/image";
import { PostItem } from "@/features/create-post/api/types";
import { useState } from "react";
import { Input } from "@/shared/ui/input/input";
import { format } from "date-fns";
import {
  useAddCommentMutation,
  useGetPostCommentsQuery,
  useGetPostLikesQuery,
  useGetPostQuery,
  useUpdateCommentLikeStatusMutation,
  useUpdatePostLikeStatusMutation,
} from "@/features/create-post/api/post.api";

type PostProps = {
  avatar: string;
  isOwner: boolean;
  onPostDeleted: (postId: number) => void;
  post: PostItem;
  userId: number;
  username?: string;
};

export const Post = ({
  post,
  avatar,
  username,
  isOwner,
  onPostDeleted,
}: PostProps) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();

  const { data: postData } = useGetPostQuery({ postId: post.id });
  const { data: likesData } = useGetPostLikesQuery({
    postId: post.id,
  });
  const { data: commentsData } = useGetPostCommentsQuery({ postId: post.id });

  const [updatePostLikeStatus] = useUpdatePostLikeStatusMutation();
  const [updateCommentLikeStatus] = useUpdateCommentLikeStatusMutation();

  const comments = commentsData?.items || [];
  const avatars =
    likesData?.items.slice(0, 3).map((user) => user.avatars[0]?.url) || [];

  const handlePostUpdated = () => {
    console.log("Post updated");
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      await addComment({
        postId: post.id,
        content: commentText,
      }).unwrap();
      setCommentText("");
    } catch (error) {
      console.error("Ошибка при отправке комментария:", error);
    }
  };
  const handlePostLikeClick = async () => {
    try {
      await updatePostLikeStatus({
        postId: post.id,
        likeStatus: postData?.isLiked ? "NONE" : "LIKE",
      }).unwrap();
    } catch (error) {
      console.error("Failed to update post like status:", error);
    }
  };

  const handleCommentLikeClick = (commentId: number) => async () => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    try {
      await updateCommentLikeStatus({
        postId: post.id,
        commentId,
        likeStatus: comment.isLiked ? "NONE" : "LIKE",
      }).unwrap();

      comment.isLiked = !comment.isLiked;
      comment.likeCount += comment.isLiked ? 1 : -1;
    } catch (error) {
      console.error("Failed to update comment like status:", error);
    }
  };

  return (
    <div className={s.root}>
      <div className={s.imgWrapper}>
        <Carousel>
          {post?.images.map((img, index) => (
            <div key={index} className={s.carouselSlide}>
              <Image
                src={img.url}
                alt={`Post image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className={s.postImage}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={s.postInfoWrapper}>
        <div className={s.header}>
          <div className={s.userInfo}>
            <AvatarSimple src={avatar} title={"me"} />
            <Typography variant={"h3"}>{username}</Typography>
          </div>
          {isOwner && (
            <PostMenu
              onPostDeleted={() => onPostDeleted(post.id)}
              postDescription={post.description}
              postId={post.id}
              postImg={post.images[0]?.url}
              onPostUpdated={handlePostUpdated}
            />
          )}
        </div>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <AvatarSimple src={avatar} title={"me"} />
            <div className={s.content_text}>
              <Typography variant={"p"}>{post.description}</Typography>
            </div>
          </div>

          {comments.map((comment) => (
            <div key={comment.id} className={s.content}>
              <AvatarSimple
                src={comment.from.avatars[0]?.url}
                title={comment.from.username}
              />
              <div className={s.comment}>
                <div className={s.contentInner}>
                  <div className={s.content_text}>
                    <Typography variant={"p"}>{comment.content}</Typography>
                  </div>
                  {isOwner && (
                    <Button
                      onClick={handleCommentLikeClick(comment.id)}
                      variant={"text"}
                    >
                      <Image
                        src={comment.isLiked ? "/heart-red.svg" : "/heart.svg"}
                        alt={"heart"}
                        height={24}
                        width={24}
                      />
                    </Button>
                  )}
                </div>
                <Typography className={s.grey} variant={"small"}>
                  {format(new Date(comment.createdAt), "PP")}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <div className={s.bottomBlock}>
          <div className={s.icons}>
            <div>
              <Button onClick={handlePostLikeClick} variant={"text"}>
                <Image
                  src={postData?.isLiked ? "/heart-red.svg" : "/heart.svg"}
                  alt={"heart"}
                  height={24}
                  width={24}
                />
              </Button>
              <Image
                src={"/paper-plane.svg"}
                alt={"paper-plane"}
                height={24}
                width={24}
              />
            </div>
            <Image
              src={"/bookmark.svg"}
              alt={"bookmark"}
              height={24}
              width={24}
            />
          </div>

          <div className={s.avatars}>
            <div className={s.avatar_container}>
              {avatars.map((el, index) => (
                <div
                  className={s.avatar}
                  key={index}
                  style={{ zIndex: avatars.length - index }}
                >
                  <AvatarSimple
                    className={s.border}
                    size={"small"}
                    src={el}
                    title={""}
                  />
                </div>
              ))}
            </div>

            <Typography variant={"span"}>
              {postData?.likesCount}
              {"  "}
              {"Like"}
            </Typography>
          </div>

          <Typography className={s.grey} variant={"small"}>
            {format(new Date(post.createdAt), "MMMM d, yyyy")}
          </Typography>

          {isOwner && (
            <form className={s.input} onSubmit={handleSubmitComment}>
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button className={s.publish} variant={"text"}>
                {isAddingComment ? "Sending..." : "Publish"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
