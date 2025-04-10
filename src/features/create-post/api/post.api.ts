import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { PostItem, UploadFileResponse } from "@/features/create-post/api/types";
import {
  PostsPublic,
  PostsUserResponse,
} from "@/features/home-page/ui/user-profile/api/types";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<
      PostItem,
      { description: string; uploadIds: string[] }
    >({
      query: ({ description, uploadIds }) => {
        return {
          body: {
            childrenMetadata: uploadIds.map((id) => {
              return {
                uploadId: id,
              };
            }),
            description,
          },
          method: "POST",
          url: "/posts",
        };
      },
    }),
    getPosts: builder.query<PostItem[], void>({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    uploadImageForPost: builder.mutation<UploadFileResponse, { file: File }>({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          body: formData,
          method: "POST",
          url: "/posts/image",
        };
      },
    }),
    editPost: builder.mutation<PostItem, { id: number; description: string }>({
      query: ({ id, description }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: [],
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      //invalidatesTags: ["Post"],
    }),
    getPostsPublic: builder.query<PostsPublic, void>({
      query: () => "public-posts/all?pageSize=4",
    }),
    getPostsUser: builder.query<
      PostsUserResponse,
      {
        id: number;
        endCursorPostId?: number | null;
      }
    >({
      query: ({ id, endCursorPostId }) => {
        const path = endCursorPostId
          ? `public-posts/user/${id}/${endCursorPostId}`
          : `public-posts/user/${id}`;

        return {
          url: path,
          params: {
            pageSize: 8,
            sortDirection: "desc",
          },
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.id}`,
      merge: (currentCache, newItems) => {
        const existingIds = new Set(currentCache.items.map((post) => post.id));
        const newPosts = newItems.items.filter(
          (post) => !existingIds.has(post.id),
        );

        currentCache.items.push(...newPosts);
        currentCache.totalCount = newItems.totalCount;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
    }),
  }),
});

export const {
  useCreatePostMutation,
  useUploadImageForPostMutation,
  useGetPostsUserQuery,
  useLazyGetPostsUserQuery,
} = postApi;
