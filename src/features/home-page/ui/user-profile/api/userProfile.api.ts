import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import {
  GetPublicUserProfileResponse,
  UploadProfileAvatarResponse,
  PostsUserResponse,
} from "./types";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Posts"],
  endpoints: (builder) => ({
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, number>({
      query: (profileId) => ({
        method: "GET",
        url: `/public-user/profile/${profileId}`,
      }),
    }),
    getPostsUser: builder.query<PostsUserResponse, { id: number; endCursorPostId: number | null }>({
      query: ({ id, endCursorPostId }) => ({
        method: "GET",
        url: `/public-user/posts/${id}`,
        params: endCursorPostId ? { cursor: endCursorPostId } : undefined,
      }),
      providesTags: ["Posts"],
    }),
    uploadProfileAvatar: builder.mutation<UploadProfileAvatarResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: "/profile/avatar",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useGetPublicUserProfileQuery,
  useLazyGetPostsUserQuery,
  useUploadProfileAvatarMutation,
} = userProfileApi;
