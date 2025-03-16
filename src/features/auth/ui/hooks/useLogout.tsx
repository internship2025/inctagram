import { useEffect, useState } from "react";
import {
  useLazyMeQuery,
  useLogoutMutation,
} from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/services/store";
import { useRouter } from "next/navigation";
import { inctagramApi } from "@/services/inctagram.api";
import { PATH } from "@/shared/constants/app-paths";

export const useLogout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [getUser, { data: userData, error }] = useLazyMeQuery();

  const router = useRouter();

  const email = localStorage.getItem("email");
  const [name, setName] = useState<string>("");

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("access_token");
      localStorage.removeItem("email");
      dispatch(inctagramApi.util.resetApiState());
      setShowConfirmation(false);
      router.push(PATH.PRIVATE_HOME);
    } catch (error) {
      console.error("Logout failed", error);
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

  const confirmLogout = () => {
    // Запрашиваем данные пользователя перед открытием модалки
    getUser();
    setShowConfirmation(true);
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
