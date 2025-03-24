"use client";

import { useAppDispatch, useAppSelector } from "@/services/store";
import s from "./userProfile.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostUsers from "../post-users/PostUser";
import PostModal from "../postModal/postModal";
import photo from "./../../../../public/images/photo.png";
import PostsUser from "../post-users/PostsUsers";
import { authApi, useGetPostsUserQuery } from "@/features/auth/api/auth.api";
import { getPostsUser } from "@/services/userApi";

export type UserProfileType = {
  data: {
    aboutMe: string;
    avatars: [
      | {
          url: string;
          width: number;
          height: number;
          fileSize: number;
          createdAt: string;
        }
      | undefined,
    ];
    id: number;
    userMetadata: {
      following: number;
      followers: number;
      publications: number;
    };
    userName: string;
  };
  initialPosts: {
    totalCount: number;
    pageSize: number;
    totalUsers: number;
    items: [
      {
        id: number;
        userName: string;
        description: string;
        location: string;
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
        createdAt: string;
        updatedAt: string;
        ownerId: number;
        avatarOwner: string;
        owner: {
          firstName: string;
          lastName: string;
        };
        likesCount: number;
        isLiked: true;
        avatarWhoLikes: false;
      },
    ];
  };
  post?: {
    
    id: number
    userName: string
    description: string
    location: string
    images: [
      {
        url: string
        width: number
        height: number
        fileSize:number
        createdAt: string
        uploadId: string
      }
    ],
    createdAt: string
    updatedAt: string
    ownerId: number
    avatarOwner: string
    owner: {
      firstName: string
      lastName: string
    },
    likesCount: number,
    isLiked: boolean
    avatarWhoLikes: boolean
  }
};



export const useInitializeCache = ({
  id,
  initialPosts,
}: {
  id: number;
  initialPosts: any;
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      authApi.util.upsertQueryData(
        "getPostsUser",
        { id, endCursorPostId: null },
        initialPosts
      )
    );
  }, []);
};


const UserProfile = ({ data, initialPosts, post }: UserProfileType) => {
  const authMe = useAppSelector((state) => state.auth.isAuthenticated);
  const [isModal, setIsmodal] = useState(false);

  const [endCursorPostId, setEndCursorPostId] = useState<null | number>(
    null
  );



  useInitializeCache({
    id: data.id,
    initialPosts,
    
  });
  const { data: posts, isFetching } = useGetPostsUserQuery({
    id: data.id,
    endCursorPostId,
  });

  const [allPosts, setAllPosts] = useState<any>(initialPosts.items);
  


  return (
    <>
      <div className={s.wrapper}>
        <div className={s.wrapperAva}>
          <Image
            className={s.ava}
            src={data?.avatars[0]?.url || photo}
            alt=""
            width={207}
            height={207}
          />
        </div>
        <div className={s.info}>
          <div className={s.name}>{data.userName}</div>
          <div className={s.container}>
            <div className={s.following}>
              <div className={s.value}>{data.userMetadata.following}</div>
              <div className={s.title}>Following</div>
            </div>
            <div className={s.followers}>
              <div className={s.value}>{data.userMetadata.followers}</div>
              <div className={s.title}>Followers</div>
            </div>
            <div className={s.publications}>
              <div className={s.value}>{data.userMetadata.publications}</div>
              <div className={s.title}>Publications</div>
            </div>
          </div>
          <div className={s.description}>
            {data.aboutMe || "Описание отсутствует"}
          </div>
        </div>
      </div>
      <PostsUser posts={allPosts} setIsmodal={setIsmodal} />

{/* Вместо false проверка по post */}
      {false && <PostModal />}
    </>
  );
};

export default UserProfile;
