import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { PostItem, UploadFileResponse } from "@/features/create-post/api/types";
import {
  PostsPublic,
  PostsUserResponse,
} from "@/features/home-page/ui/user-profile/api/types";

export type Avatar = {
  url: string;
  width: number;
  height: number;
  fileSize: number;
  createdAt: string;
};

// Тип для автора комментария
export type ParentViewModel = {
  id: number;
  username: string;
  avatars: Avatar[];
};
// Основной тип комментария
export type CommentsViewModel = {
  id: number;
  postId: number;
  from: ParentViewModel;
  content: string;
  createdAt: string;
  answerCount: number;
  likeCount: number;
  isLiked: boolean;
};
export type CommentsResponse = {
  totalCount?: number;
  items: CommentsViewModel[];
};
export type UserFollowingFollowersViewModel = {
  id: number;
  userId: number;
  userName: string;
  createdAt: string;
  avatars: Avatar[];
  isFollowing: boolean;
  isFollowedBy: boolean;
};

export type LikesResponseType = {
  pageSize: number;
  totalCount: number;
  notReadCount?: number;
  items: UserFollowingFollowersViewModel[];
};

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post", "PostLikes", "Comment", "CommentLikes"],
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
    getPostComments: builder.query<CommentsResponse, { postId: number }>({
      query: ({ postId }) => `/posts/${postId}/comments`,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Comment" as const,
                id,
              })),
              { type: "Comment", id: "LIST" },
            ]
          : [{ type: "Comment", id: "LIST" }],
    }),
    getPost: builder.query<PostItem, { postId: number }>({
      query: ({ postId }) => ({
        url: `/posts/id/${postId}`,
        method: "GET",
      }),
      providesTags: (result, error, { postId }) =>
        result ? [{ type: "Post", id: postId }] : [],
    }),
    addComment: builder.mutation<
      CommentsViewModel,
      { postId: number; content: string }
    >({
      query: ({ postId, content }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: "LIST" },
        { type: "Post", id: postId },
      ],
    }),
    getPostLikes: builder.query<LikesResponseType, { postId: number }>({
      query: ({ postId }) => ({
        url: `/posts/${postId}/likes`,
        method: "GET",
      }),
      providesTags: (result, error, { postId }) =>
        result ? [{ type: "PostLikes", id: postId }] : [],
    }),
    updatePostLikeStatus: builder.mutation<
      void,
      { postId: number; likeStatus: "NONE" | "LIKE" }
    >({
      query: ({ postId, likeStatus }) => ({
        url: `/posts/${postId}/like-status`,
        method: "PUT",
        body: { likeStatus },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "PostLikes", id: postId },
        { type: "Post", id: postId },
      ],
    }),
    updateCommentLikeStatus: builder.mutation<
      void,
      { postId: number; commentId: number; likeStatus: "NONE" | "LIKE" }
    >({
      query: ({ postId, commentId, likeStatus }) => ({
        url: `posts/${postId}/comments/${commentId}/like-status`,
        method: "PUT",
        body: { likeStatus },
      }),
      invalidatesTags: (result, error, { postId, commentId }) => [
        { type: "CommentLikes", id: commentId },
        { type: "Comment", id: commentId },
        { type: "Post", id: postId },
      ],
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
    editPost: builder.mutation<
      PostItem,
      { postId: number; description: string }
    >({
      query: ({ postId, description }) => ({
        url: `/posts/${postId}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
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
  useLazyGetPostsUserQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useGetPostQuery,
  useGetPostLikesQuery,
  useUpdatePostLikeStatusMutation,
  useUpdateCommentLikeStatusMutation,
  useGetPostCommentsQuery,
  useAddCommentMutation,
} = postApi;
