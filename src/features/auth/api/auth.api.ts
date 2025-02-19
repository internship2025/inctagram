import { ictagramApi } from "@/services/inctagram.api";

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

export const authApi = ictagramApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<MeResponse, void>({
      providesTags: ["Me"],
      query: () => ({
        url: "v1/auth/me",
      }),
    }),
  }),
});

export const { useMeQuery } = authApi;
