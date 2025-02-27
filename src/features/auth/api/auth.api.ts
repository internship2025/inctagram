import { inctagramApi } from "@/services/inctagram.api";
import { baseUrl } from "@/shared/constants/app-paths";

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

export type PasswordRecoveryArgs = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export type SetNewPasswordArgs = {
  newPassword: string;
  recoveryCode: string;
};

export type loginWithGoogleArgs = {
  redirectUrl: string;
  code: string;
};

export type loginWithGoogleResponse = {
  accessToken: string;
  email: string;
};

export const authApi = inctagramApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      providesTags: ["Me"],
      query: () => ({
        url: "v1/auth/me",
      }),
    }),
    signup: builder.mutation<void, SignUpArgs>({
      query: (args) => ({
        body: { ...args, baseUrl },
        method: "POST",
        url: "/v1/auth/registration",
      }),
    }),
    loginWithGoogle: builder.mutation<
      loginWithGoogleResponse,
      loginWithGoogleArgs
    >({
      query: (args) => {
        return {
          body: args,
          method: "POST",
          url: "v1/auth/google/login",
        };
      },
    }),
  }),
});

export const { useMeQuery, useSignupMutation, useLoginWithGoogleMutation } = authApi;
