import { Params } from "./types";

export function setSearchParams(baseUrl: string, params: Params) {
  const pathWithCursor = params.cursor 
    ? `${baseUrl}/${params.cursor}`
    : baseUrl;

  const { cursor, ...restParams } = params;

  const allParams = {
    pageSize: 12,
    sortDirection: "desc",
    ...restParams,
  };

  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(allParams)) {
    if (value !== undefined) {
      queryParams.append(key, String(value));
    }
  }

  const queryString = queryParams.toString();
  return queryString 
    ? `${pathWithCursor}?${queryString}`
    : pathWithCursor;
}