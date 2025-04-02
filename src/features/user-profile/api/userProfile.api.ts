import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { GetPublicUserProfileResponse } from "@/features/user-profile/api/types";

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Posts"],
  endpoints: (builder) => ({
    getPublicUserProfile: builder.query<GetPublicUserProfileResponse, number>({
      query: (profileId) => ({
        method: "GET",
        url: `v1/public-user/profile/${profileId}`,
      }),
    }),
  }),
});

export const { useGetPublicUserProfileQuery } = userProfileApi;
