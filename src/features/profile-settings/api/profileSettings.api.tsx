import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CurrentSubscriptionType,
  ErrorResponse,
  ExtendedUserProfile,
  PaymentInfo,
  UserProfile,
} from "@/features/profile-settings/api/types";
import { DataType } from "@/features/profile-settings/ui/account-menegment/hooks/useSetSubscription";

export const profileSettingsApi = createApi({
  reducerPath: "profileSettingsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reneva"],
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
    createPremiumSubscription: builder.mutation<
      { url: string },
      DataType
    >({
      query: (body) => {
        console.log(body);
        return {
          url: "subscriptions",
          method: "POST",
          body,
        };
      },
    }),
    getCurrentSubscription: builder.query<CurrentSubscriptionType, void>({
      providesTags: ["Reneva"],
      query: () => "subscriptions/current-payment-subscriptions",
    }),
    canselRenevalAuto: builder.mutation<void, void>({
      query: () => ({
        url: "subscriptions/canceled-auto-renewal",
        method: "POST",
      }),
      invalidatesTags: ["Reneva"],
    }),
  }),
});
export const {
  useCanselRenevalAutoMutation,
  useGetCurrentSubscriptionQuery,
  useGetCurrentProfileQuery,
  useUpdateCurrentProfileMutation,
  useCreatePremiumSubscriptionMutation,
  useGetPaymentInfoQuery,
} = profileSettingsApi;
