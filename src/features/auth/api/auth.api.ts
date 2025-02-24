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
    logout: builder.mutation<void, void>({
      query: () => ({
        method: "POST",
        url: "v1/auth/logout",
      }),
      invalidatesTags: ["Me"], // Чтобы обновить состояние после логаута
    }),
  }),
});

export const { useMeQuery, useSignupMutation, useLogoutMutation } = authApi;