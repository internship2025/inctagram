import { createApi } from "@reduxjs/toolkit/query/react";
import { NotificationsType, Params, WS_EVENT_PATH } from "./types";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";
import { initSocketConnection, subscribeToNotifications } from "./socket-api";
import { setSearchParams } from "./setSerchParams";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotification: builder.query<NotificationsType, Params>({
      query: (params) => {
        return setSearchParams("notifications", params);
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        const mergedItems = [...currentCache.items, ...newItems.items];

        const uniqueItems = [
          ...new Map(mergedItems.map((item) => [item.id, item])).values(),
        ];

        return {
          ...newItems,
          items: uniqueItems,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.cursor !== previousArg?.cursor;
      },
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        initSocketConnection();
        try {
          await cacheDataLoaded;

          subscribeToNotifications((data) => {
            updateCachedData((draft) => {
              draft.items.unshift(data);
            });
          });

          await cacheEntryRemoved;
        } catch {}
      },
    }),
    markIsRead: builder.mutation<void, Array<number>>({
      query: (body) => {
        console.log(body);
        return {
          url: "notifications/mark-as-read",
          method: "PUT",
          body: {
            ids: body,
          },
        };
      },
    }),
    deletedNotification: builder.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `notifications/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useMarkIsReadMutation,
  useDeletedNotificationMutation,
} = notificationsApi;
