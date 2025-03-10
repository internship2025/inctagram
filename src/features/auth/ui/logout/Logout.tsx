"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import {
  useLazyMeQuery,
  useLogoutMutation,
} from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/services/store";
import { inctagramApi } from "@/services/inctagram.api";
import { Modal } from "@/shared/ui/modal/modal";
import styles from "./logout.module.css";

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [getUser, { data: userData, error }] = useLazyMeQuery();
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail || "Unknown User");
    }
  }, []);

  // useEffect для получения данных пользователя и обновления имени
  useEffect(() => {
    if (userData) {
      setName(userData.userName); // Обновляем имя, если данные пришли
    } else if (error) {
      console.error("Failed to fetch user data", error);
      setName("Unknown User"); // Если ошибка, устанавливаем "Unknown User"
    }
  }, [userData, error]);

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");
        dispatch(inctagramApi.util.resetApiState());
      })
      .catch((error) => {
        console.error("Logout failed", error);
      });
  };

  const confirmLogout = () => {
    // Запрашиваем данные пользователя перед открытием модалки
    getUser();
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Button onClick={confirmLogout}>Log out</Button>

      <Modal
        open={showConfirmation}
        onClose={cancelLogout}
        title="Are you sure you want to log out?"
        isClose={true}
      >
        <p>
          Are you really want to log out of your account{" "}
          <strong>{email}</strong> ({name})?
        </p>
        <div className={styles.buttonLogout}>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={cancelLogout}>No</Button>
        </div>
      </Modal>
    </>
  );
};

export default Logout;
