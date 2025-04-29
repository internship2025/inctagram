import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import {
  GetPublicUserProfileResponse,
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
    uploadProfileAvatar: builder.mutation<
      UploadProfileAvatarResponse,
      { file: File }
    >({
      query: ({ file }) => {},
    }),
  }),
});

export const { useGetPublicUserProfileQuery } = userProfileApi;
