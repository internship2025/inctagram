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
      query: () => "auth/me"
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
} = authApi;
