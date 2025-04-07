import { baseUrl } from "@/shared/constants/app-paths";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.api";
import {
  ConfirmEmailArgs,
  CreateNewPassword,
  ForgotPassword,
  LoginArgs,
  LoginResponse,
  loginWithGoogleArgs,
  loginWithGoogleResponse,
  MeResponse,
  ResendConfirmationArgs,
  SignUpArgs,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Posts"],
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      providesTags: ["Me"],
      query: () => ({
        url: "auth/me",
      }),
    }),
    signup: builder.mutation<void, SignUpArgs>({
      query: (args) => ({
        body: { ...args, baseUrl },
        method: "POST",
        url: "auth/registration",
      }),
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email: body.email,
          password: body.password,
        },
      }),
    }),
    forgotPassword: builder.mutation<void, ForgotPassword>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "auth/password-recovery",
      }),
    }),
    forgotPasswordConfirmation: builder.mutation<void, ForgotPassword>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "auth/password-recovery-resending",
      }),
    }),
    createNewPassword: builder.mutation<void, CreateNewPassword>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: "auth/new-password",
      }),
      invalidatesTags: ["Me"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        method: "POST",
        url: "auth/logout",
      }),
      invalidatesTags: ["Me"], // Чтобы обновить состояние после логаута
    }),
    confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `auth/registration-confirmation`,
      }),
    }),
    resendConfirmation: builder.mutation<void, ResendConfirmationArgs>({
      query: (args) => ({
        body: { ...args, baseUrl },
        method: "POST",
        url: "auth/registration-email-resending",
      }),
    }),
    loginWithGoogle: builder.mutation<
      loginWithGoogleResponse,
      loginWithGoogleArgs
    >({
      query: (body) => {
        return {
          body,
          method: "POST",
          url: "auth/google/login",
        };
      },
    }),
    getPostsPublic: builder.query<PostsPublic, void>({
      query: () => "public-posts/all?pageSize=4",
    }),
    getPostsUser: builder.query<
      PostsUserResponse,
      { id: number; endCursorPostId?: number | null }
    >({
      query: ({ id, endCursorPostId }) =>
        `public-posts/user/${id}/${endCursorPostId || ""}?pageSize=8`,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.id}`,
      merge: (currentCache, newItems) => ({
        ...newItems,
        items: [...currentCache.items, ...newItems.items],
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
    }),
    getPostById: builder.query<PostDetailsResponse, number>({
      query: (postId) => `posts/id/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Posts", id: postId }],
    }),
    getNotification: builder.query<NotificationsType, void>({
      query: () => "notifications",
    }),
  }),
});
export const {
  useMeQuery,
  useLazyMeQuery,
  useSignupMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
  useForgotPasswordConfirmationMutation,
  useLoginMutation,
  useLogoutMutation,
  useConfirmEmailMutation,
  useResendConfirmationMutation,
  useLoginWithGoogleMutation,
  useGetPostsPublicQuery,
  useGetNotificationQuery,
  useGetPostsUserQuery,
  useGetPostByIdQuery,
} = authApi;
