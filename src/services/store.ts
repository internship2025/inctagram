import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { authApi } from "@/features/auth/api/auth.api";
import { authSlice } from "@/features/auth/api/authSlice";
import { createPostSlice } from "@/features/create-post/utils/createPostSlice";
import { postApi } from "@/features/create-post/api/post.api";
import { userProfileApi } from "@/features/home-page/ui/user-profile/api/userProfile.api";
import { notificationsApi } from "@/features/notifications/api/notifications.api";
import { profileSettingsApi } from "@/features/profile-settings/api/profileSettings.api";
import { rtkQueryErrorLogger } from "./errorMiddleware";

export const makeStore = () => {
  const apiMiddlewares = [
    authApi.middleware,
    postApi.middleware,
    userProfileApi.middleware,
    notificationsApi.middleware,
    profileSettingsApi.middleware,
  ];
  return configureStore({
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...apiMiddlewares, rtkQueryErrorLogger),
    reducer: combineSlices(
      authApi,
      postApi,
      userProfileApi,
      authSlice,
      createPostSlice,
      notificationsApi,
      profileSettingsApi
    ),
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
