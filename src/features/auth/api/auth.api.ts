
import { baseUrl } from "@/shared/constants/app-paths";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseApi";

export type MeResponse = {
  userId: number;
  username: string;
  email: string;
  isBlocked: boolean;
};

export type SignUpArgs = {
  userName: string;
  email: string;
  password: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type ResendConfirmationArgs = {
  email: string;
};

export type ConfirmEmailArgs = {
  confirmationCode: string;
};

export type loginWithGoogleArgs = {
  redirectUrl: string;
  code: string;
};

export type loginWithGoogleResponse = {
  accessToken: string;
  email: string;
};

export const authApi = createApi({
  reducerPath: "inctagramApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me"],
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
        url: "auth/login",
        method: "POST",
        body: {
          email: body.email,
          password: body.password,
        },
      }),
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
  useLoginMutation,
  useLogoutMutation,
  useConfirmEmailMutation,
  useResendConfirmationMutation,
  useLoginWithGoogleMutation
} = authApi;
