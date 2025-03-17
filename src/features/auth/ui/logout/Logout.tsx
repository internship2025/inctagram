"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button/button";
import {
  useLazyMeQuery,
  useLogoutMutation,
} from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/services/store";
import { inctagramApi } from "@/services/inctagram.api";
import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/modal/modal";
import styles from "./logout.module.css";
import { PATH } from "@/shared/constants/app-paths";

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [getUser, { data: userData, error }] = useLazyMeQuery();
  const router = useRouter();

  const email = localStorage.getItem("email");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setName(userData.userName);
    } else if (error) {
      setName("Unknown User");
    }
  }, [userData, error]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      
      // Очистка хранилища
      localStorage.removeItem("access_token");
      localStorage.removeItem("email");
      setName("");
      
      // Сброс кэша RTK Query
      await dispatch(inctagramApi.util.resetApiState());
      
      // Редирект с принудительным обновлением
      router.replace(PATH.SIGN_IN);
      router.refresh();
      
      // Для гарантированного перехода (раскомментировать если нужно)
      // window.location.href = PATH.SIGN_IN;
      
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const confirmLogout = () => {
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