"use client";

import s from "./post.module.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PhotoSlider from "../photosSlider/photosSlider";
import { calculatingDate } from "@/features/auth/utils/dateUtils";

type Post = {
  id: number;
  description: string;
  postId: number;
  userName: string;
  updatedAt: string;
  avatarOwner: string;
  ownerId: string;
  images: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
      uploadId: string;
    },
  ];
};

const PostsHome = (props: Post) => {
  const textRef = useRef<HTMLDivElement | null>(null);

  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSlider, setIslider] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(textRef.current).lineHeight,
        10,
      );
      const maxHeight = lineHeight * 3;

      setIsOverflowing(textRef.current.scrollHeight > maxHeight);
    }
  }, [props.description]);

  const date = calculatingDate(props.updatedAt);

  function toggleText(isVal: boolean) {
    setIsExpanded(isVal);
    setIslider(isVal);
  }

  return (
    <div className={s.wrapper}>
      <div>
        <PhotoSlider
          isSlider={isSlider}
          ownerId={props.ownerId}
          id={props.id}
          images={props.images}
        />
      </div>
      <div className={s.wrapperAvatar}>
        {props.avatarOwner && (
          <Image
            className={s.ava}
            src={props.avatarOwner}
            alt=""
            width={36}
            height={36}
          />
        )}

        <span>{props.userName}</span>
      </div>
      <div className={s.date}>{date}</div>
      <div className={s.wrapperText}>
        <span ref={textRef} className={`${s.text} ${isExpanded && s.showText}`}>
          {props.description || "Описание отсутствует"}
          {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          deserunt ipsa recusandae id officia iure libero sit obcaecati
          doloremque perferendis sdvdsvssssssssssssssssssv svvdsssssssssssssss!
          deserunt ipsa recusandae id officia iure libero sit obcaecati
          doloremque perferendis sdvdsvssssssssssssssssssv svvdsssssssssssssss! */}
        </span>

        {isOverflowing && !isExpanded && (
          <button onClick={() => toggleText(true)} className={s.button}>
            Show more
          </button>
        )}
        {isExpanded && (
          <button onClick={() => toggleText(false)} className={s.button}>
            Hide
          </button>
        )}
      </div>
    </div>
  );
};

export default PostsHome;
