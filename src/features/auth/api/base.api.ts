"use client";

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

// Базовый fetchBaseQuery с установкой токена из localStorage
export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: "https://inctagram.work/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// mutex для предотвращения одновременного обновления токена
const mutex = new Mutex();

// Обертка для безопасного выполнения запросов с отловом сетевых ошибок
const safeBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | { status: string; data: string },
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQueryWithAccessToken(args, api, extraOptions);
    return result;
  } catch {
    return {
      error: {
        status: "FETCH_ERROR",
        data: "Network error",
      },
    };
  }
};

// Обертка для работы с токенами и повтором запросов при 401
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | { status: string; data: string },
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const url = typeof args === "string" ? args : args.url;

  let result = await safeBaseQuery(args, api, extraOptions);

  if (
    result.error?.status === 401 ||
    (result.error?.status === "PARSING_ERROR" &&
      (result as { error?: { originalStatus?: number } }).error?.originalStatus === 401 &&
      !url.includes("auth/logout"))
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await safeBaseQuery(
          {
            url: "auth/update-tokens",
            method: "POST",
            body: {},
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const data = refreshResult.data as { accessToken: string };
          localStorage.setItem("access_token", data.accessToken);

          // Повторяем оригинальный запрос после обновления токена
          result = await safeBaseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await safeBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};
