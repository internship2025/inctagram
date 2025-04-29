import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ErrorResponse,
  ExtendedUserProfile,
  UserProfile,
} from "@/features/profile-settings/api/types";

export const profileSettingsApi = createApi({
  reducerPath: "profileSettingsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentProfile: builder.query<ExtendedUserProfile, void>({
      query: () => ({
        url: "users/profile",
        method: "GET"
      }),
    }),

    updateCurrentProfile: builder.mutation<void, UserProfile>({
      query: (body) => ({
        url: "users/profile",
        method: "PUT",
        body,
      }),
      transformErrorResponse: (response: {
        status: number;
        data: ErrorResponse;
      }) => response.data,
    }),
  }),
});
export const { useGetCurrentProfileQuery, useUpdateCurrentProfileMutation } =
  profileSettingsApi;
