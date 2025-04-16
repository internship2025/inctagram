import { baseUrl } from "@/shared/constants/app-paths";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./base.api";

export type MeResponse = {
  userId: number;
  userName: string;
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

export type ForgotPassword = {
  email: string;
  recaptcha?: string;
  baseUrl: string;
};

export type CreateNewPassword = {
  newPassword: string;
  recoveryCode: string;
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

export type PostsPublic = {
  totalCount: number;
  pageSize: number;
  totalUsers: number;
  items: [
    {
      id: number;
      userName: string;
      description: string;
      location: string;
      images: [
        {
          url: string;
          width: number;
          height: number;
          fileSize: number;
          createdAt: string;
          uploadId: string;
        },
      ];
      createdAt: string;
      updatedAt: string;
      ownerId: 1;
      avatarOwner: string;
      owner: {
        firstName: string;
        lastName: string;
      };
      likesCount: number;
      isLiked: boolean;
      avatarWhoLikes: boolean;
    },
  ];
};

export type NotificationsType = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: [
    {
      id: number;
      message: string;
      isRead: boolean;
      createdAt: string;
    },
  ];
};

export type PostImage = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
  uploadId: string;
};

export type PostDetailsResponse = {
  id: number;
  userName: string;
  description: string;
  location: string;
  images: PostImage[];
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  avatarOwner: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  likesCount: number;
  isLiked: boolean;
  avatarWhoLikes: boolean;
};

export type PostsUserResponse = {
  totalCount: number;
  pageSize: number;
  items: PostDetailsResponse[];
  nextCursor: number | null;
};

type UsersProfile = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region: string;
  dateOfBirth: string;
  aboutMe: string;
  avatars: [
    {
      url: string;
      width: number;
      height: number;
      fileSize: number;
      createdAt: string;
    },
  ];
  createdAt: string;
};

type ErrorResponse = {
  statusCode: number;
  messages: Array<{
    message: string;
    field: string;
  }>;
  error: string;
};

type UserProfile = {
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  region?: string;
  dateOfBirth?: string;
  aboutMe?: string;
};


type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string; // или Date, если парсится
};

type ExtendedUserProfile = UserProfile & {
  id: number;
  avatars: Avatar[];
  createdAt: string; 
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Posts", "Info"],
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
    updateCurrentProfile: builder.mutation<void, UserProfile>({
      query: (body) => ({
        url: "users/profile",
        method: "PUT",
        body,
      }),
      // invalidatesTags: ["Info"],
      transformErrorResponse: (response: {
        status: number;
        data: ErrorResponse;
      }) => response.data,
    }),
    getCurrentProfile: builder.query<ExtendedUserProfile, void>({
       query: ()=> 'users/profile',
      //  providesTags: ["Info"]
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
  useGetCurrentProfileQuery,
  useUpdateCurrentProfileMutation
} = authApi;
