import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/baseApi";
import {
  CreatePostRequest,
  Posts,
  ResponceAllPosts,
} from "@/features/auth/api/post/types";

const PostApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createPost: builder.mutation<Posts, CreatePostRequest>({
      query: (payload) => ({
        url: "/v1/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Post"],
    }),
    getPosts: builder.query<Posts[], void>({
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
          url: `v1/public-posts/user/${userId}/${endCursorPostId || ""}`,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
    }),
    editPost: builder.mutation<Posts, { id: number; description: string }>({
      query: ({ id, description }) => ({
        url: `v1/posts/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: [],
    }),

    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `v1/posts/${postId}`,
        method: "DELETE",
      }),
      //invalidatesTags: ["Post"],
    }),
  }),
});

export const {} = PostApi.endpoints;
export const {} = PostApi;
export default PostApi;
