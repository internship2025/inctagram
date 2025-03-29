import { useEffect, useState } from "react";
import {
  useLazyMeQuery,
  useLogoutMutation,
} from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/services/store";
import { useRouter } from "next/navigation";
import { inctagramApi } from "@/services/inctagram.api";
import { PATH } from "@/shared/constants/app-paths";
import { setAuthenticated } from "../../api/authSlice";

export const useLogout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [getUser, { data: userData, error }] = useLazyMeQuery();

  const router = useRouter();

  const email = localStorage.getItem("email");
  const [name, setName] = useState<string>(localStorage.getItem("userName") || "");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout request failed", error);
    } finally {
      // Всегда выполняем эти действия, даже если получили 401
      localStorage.removeItem("access_token");
      localStorage.removeItem("email");
      localStorage.removeItem("userName");
      dispatch(inctagramApi.util.resetApiState());
      dispatch(setAuthenticated({ userId: null}))
      setShowConfirmation(false);
      router.push(PATH.ROOT);
    }
  };
  // useEffect для получения данных пользователя и обновления имени
  useEffect(() => {
    if (userData) {
      setName(userData.userName); // Обновляем имя, если данные пришли
    } else if (error) {
      console.error("Failed to fetch user data", error);
      setName("Unknown User"); // Если ошибка, устанавливаем "Unknown User"
    }
  }, [userData, error]);

  const confirmLogout = async () => {
    // Если у нас уже есть email и имя, просто показываем модалку
    if (email && name) {
      setShowConfirmation(true);
      return;
    }

    try {
      const userData = await getUser().unwrap();
      console.log('User data received:', userData);
      setName(userData.userName);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Failed to get user data', error);
      setName('Unknown User');
      setShowConfirmation(true);
    }
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };
  return {
    showConfirmation,
    email,
    name,
    handleLogout,
    confirmLogout,
    cancelLogout,
  };
};
