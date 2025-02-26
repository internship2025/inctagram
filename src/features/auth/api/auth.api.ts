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
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  useSignupMutation,
  useLoginMutation,
} = authApi;
