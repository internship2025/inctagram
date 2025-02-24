import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://inctagram.work/api/v1",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: "inctagramApi",
  tagTypes: ["Me"],
});
