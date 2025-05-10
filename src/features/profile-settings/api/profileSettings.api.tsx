import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ErrorResponse,
  ExtendedUserProfile,
  PaymentInfo,
  UserProfile,
} from "@/features/profile-settings/api/types";

export const profileSettingsApi = createApi({
  reducerPath: "profileSettingsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCurrentProfile: builder.query<ExtendedUserProfile, void>({
      query: () => ({
        url: "users/profile",
        method: "GET",
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
    getPaymentInfo: builder.query<PaymentInfo[], void>({
      query: () => ({
        url: "subscriptions/my-payments",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetCurrentProfileQuery,
  useUpdateCurrentProfileMutation,
  useGetPaymentInfoQuery,
} = profileSettingsApi;
