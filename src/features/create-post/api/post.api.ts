import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import {
  PostItem,
  ResponceAllPosts,
  UploadFileResponse,
} from "@/features/create-post/api/types";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<
      PostItem,
      { description: string; uploadId: string[] }
    >({
      query: ({ description, uploadId }) => {
        return {
          body: {
            childrenMetadata: uploadId.map((id) => {
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
    getPostsByUserId: builder.query<
      ResponceAllPosts,
      { pageSize: number; endCursorPostId: number | null; userId: number }
    >({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.endCursorPostId !== previousArg?.endCursorPostId;
      },
      merge: (currentCache, newPosts) => {
        const existingItemsIds = new Set(
          currentCache.items.map((item) => item.id),
        );
        const uniquePosts = newPosts.items.filter(
          (post) => !existingItemsIds.has(post.id),
        );
        currentCache.items.push(...uniquePosts);
      },
      providesTags: ["Post"],
      query: ({ pageSize, endCursorPostId, userId }) => {
        return {
          method: "GET",
          params: { pageSize, endCursorPostId, userId },
          url: `/public-posts/user/${userId}/${endCursorPostId || ""}`,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
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
  }),
});

export const { useCreatePostMutation, useUploadImageForPostMutation } = postApi;
