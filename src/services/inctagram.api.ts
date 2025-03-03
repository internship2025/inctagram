import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: "https://inctagram.work/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQueryWithAccessToken(args, api, extraOptions);

  if (
    result.error?.status === 401 ||
    (result.error?.status === "PARSING_ERROR" &&
      result.error?.originalStatus === 401)
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryWithAccessToken(
          {
            url: "v1/auth/update-tokens",
            method: "POST",
            body: {},
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string };
          sessionStorage.setItem("access_token", data.accessToken);
          result = await baseQueryWithAccessToken(args, api, extraOptions);
        } else {
        }
      } catch (error) {
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQueryWithAccessToken(args, api, extraOptions);
    }
  }
  return result;
};
