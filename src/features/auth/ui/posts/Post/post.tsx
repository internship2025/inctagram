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

type PostProps = {
  avatar: string;
  isOwner: boolean;
  onPostDeleted: (postId: number) => void;
  post: PostItem;
  userId: number;
  username?: string;
  onAddComment?: (postId: number, commentText: string) => void;
};

export const Post = ({
  post,
  avatar,
  username,
  isOwner,
  onPostDeleted,
  onAddComment,
}: PostProps) => {
  const avatars = ["", "", ""];
  const likesCount = 2876;
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  console.log("Post props:", { post, avatar, username, isOwner });

  const handlePostUpdated = () => {
    console.log("Post updated");
  };
  const handleLikeClick = () => {
    setIsLiked(!isLiked); // Переключаем состояние
  };
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      onAddComment(post.id, commentText);
      setCommentText("");
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

          <div className={s.content}>
            <AvatarSimple title={"commenter"} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <div className={s.content_text}>
                  <Typography variant={"p"}>Lorem</Typography>
                </div>
                {isOwner && (
                  <Button onClick={handleLikeClick} variant={"text"}>
                    <Image
                      src={isLiked ? "/heart-red.svg" : "/heart.svg"}
                      alt={"heart"}
                      height={"24"}
                      width={"24"}
                    />
                  </Button>
                )}
              </div>

              <Typography className={s.grey} variant={"small"}>
                2 hours ago
              </Typography>
            </div>
          </div>

          <div className={s.content}>
            <AvatarSimple title={"commenter"} />
            <div className={s.comment}>
              <div className={s.contentInner}>
                <div className={s.content_text}>
                  <Typography variant={"p"}>Lorem</Typography>
                </div>
                {isOwner && (
                  <Button onClick={handleLikeClick} variant={"text"}>
                    <Image
                      src={isLiked ? "/heart-red.svg" : "/heart.svg"}
                      alt={"heart"}
                      height={"24"}
                      width={"24"}
                    />
                  </Button>
                )}
              </div>

              <Typography className={s.grey} variant={"small"}>
                2 hours ago
              </Typography>
            </div>
          </div>
        </div>

        <div className={s.bottomBlock}>
          {isOwner && (
            <div className={s.icons}>
              <div>
                <Image
                  src={"/heart.svg"}
                  alt={"heart"}
                  height={"24"}
                  width={"24"}
                />
                <Image
                  src={"/paper-plane.svg"}
                  alt={"paper-plane"}
                  height={"24"}
                  width={"24"}
                />
              </div>
              <Image
                src={"/bookmark.svg"}
                alt={"bookmark"}
                height={"24"}
                width={"24"}
              />
            </div>
          )}

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
              {likesCount}
              {"  "}
              {"Like"}
            </Typography>
          </div>

          <Typography className={s.grey} variant={"small"}>
            {format(new Date(post.createdAt), "MMMM d, yyyy")}
          </Typography>

          {isOwner && (
            <form className={s.input} onSubmit={handleCommentSubmit}>
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button className={s.publish} variant={"text"}>
                Publish
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
