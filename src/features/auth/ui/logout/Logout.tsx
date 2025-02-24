import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { useLogoutMutation } from "@/features/auth/api/auth.api";
import { useAppDispatch } from "@/services/store";
import { inctagramApi } from "@/services/inctagram.api";
import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/modal/modal";
import styles from "./logout.module.css";

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const email = "user@example.com"; // Получить из состояния пользователя
  const name = "John Doe"; // Получить из состояния пользователя

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        // Успешный выход
        localStorage.removeItem("access_token");
        dispatch(inctagramApi.util.resetApiState());
        router.push("/login");
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Logout failed", error);
      });
  };
  
  const confirmLogout = () => {
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
          Are you really want to log out of your account <strong>{email}</strong> ({name})?
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
