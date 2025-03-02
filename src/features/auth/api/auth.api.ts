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
        url: "v1/auth/registration",
      }),
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      query: (body) => ({
        url: "v1/auth/login",
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
        url: "v1/auth/logout",
      }),
      invalidatesTags: ["Me"], // Чтобы обновить состояние после логаута
    }),
    confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
      query: (args) => ({
        body: args,
        method: "POST",
        url: `v1/auth/registration-confirmation`,
      }),
    }),
    resendConfirmation: builder.mutation<void, ResendConfirmationArgs>({
      query: (args) => ({
        body: { ...args, baseUrl },
        method: "POST",
        url: "/v1/auth/registration-email-resending",
      }),
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
} = authApi;
