import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { authApi } from "@/features/auth/api/auth.api";
import { authSlice } from "@/features/auth/api/authSlice";
import { createPostSlice } from "@/features/create-post/utils/createPostSlice";

export const makeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
    reducer: combineSlices(authApi, authSlice, createPostSlice),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Типизация для useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
): TSelected => useSelector(selector);

// Типизация для useStore
export const useAppStore = () => useStore<AppStore>();
