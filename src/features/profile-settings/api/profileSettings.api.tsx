import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const profileSettingsApi = createApi({
  reducerPath: "profileSettingsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Reneva"],
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
    createPremiumSubscription: builder.mutation<{url: string},SubscriptionType>({
      query: (body) => {
        console.log(body)
        return{
          url: "subscriptions",
        method: "POST",
        body
        }
       
      }
    }),
    getCurrentSubscription: builder.query<CurrentSubscriptionType, void>({
      providesTags: ["Reneva"],
     query: () => "subscriptions/current-payment-subscriptions"
    }),
    canselRenevalAuto: builder.mutation<void, void>({
     query: ()=>({
      url: 'subscriptions/canceled-auto-renewal',
      method: "POST"
     }),
     invalidatesTags: ["Reneva"],
    })
  }),

});
export const {useCanselRenevalAutoMutation, useGetCurrentSubscriptionQuery, useGetCurrentProfileQuery, useUpdateCurrentProfileMutation, useCreatePremiumSubscriptionMutation } =
  profileSettingsApi;
