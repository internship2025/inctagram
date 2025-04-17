import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileSettingsApi = createApi({
  reducerPath: "profileSettingsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentProfile: builder.query<ExtendedUserProfile, void>({
      query: () => "users/profile",
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
