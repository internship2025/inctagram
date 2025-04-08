import { createApi } from "@reduxjs/toolkit/query/react";
import { NotificationsType } from "@/features/home-page/ui/user-profile/api/types";
import { baseQueryWithReauth } from "@/features/auth/api/base.api";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Posts"],
  endpoints: (builder) => ({
    getNotification: builder.query<NotificationsType, void>({
      query: () => "notifications",
    }),
  }),
});
export const { useGetNotificationQuery } = notificationsApi;
