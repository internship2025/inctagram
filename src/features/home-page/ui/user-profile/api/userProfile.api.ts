import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import {
  GetPublicUserProfileResponse,
  GetUserProfileResponse,
  PostsUserResponse,
  UploadProfileAvatarResponse,
} from "@/features/home-page/ui/user-profile/api/types";

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
    getPostsUser: builder.query<
      PostsUserResponse,
      { id: number; endCursorPostId: number | null }
    >({
      query: ({ id, endCursorPostId }) => ({
        method: "GET",
        url: `/public-user/posts/${id}`,
        params: endCursorPostId ? { cursor: endCursorPostId } : undefined,
      }),
      providesTags: ["Posts"],
    }),
    getProfile: builder.query<GetUserProfileResponse, void>({
      query: () => ({
        method: "GET",
        url: "/users/profile",
      }),
      providesTags: ["Me"],
    }),
    uploadProfileAvatar: builder.mutation<
      UploadProfileAvatarResponse,
      { file: File }
    >({
      query: ({ file }) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          body: formData,
          method: "POST",
          url: "/users/profile/avatar",
        };
      },
      invalidatesTags: ["Me"],
    }),
    deleteProfileAvatar: builder.mutation<void, void>({
      query: () => ({
        method: "DELETE",
        url: "/users/profile/avatar",
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const {
  useGetPublicUserProfileQuery,
  useUploadProfileAvatarMutation,
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
} = userProfileApi;
