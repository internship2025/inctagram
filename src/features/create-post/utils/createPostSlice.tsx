import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draftImages: [] as string[],
  images: [] as string[],
};

export const createPostSlice = createSlice({
  initialState: initialState,
  name: "createPost",
  reducers: {},
});
