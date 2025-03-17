"use client";

import { Button } from "@/shared/ui/button/button";
import { Modal } from "@/shared/ui/modal/modal";
import styles from "./logout.module.css";
import { Typography } from "@/shared/ui/typography/typography";
import { useLogout } from "@/features/auth/ui/hooks/useLogout";

const Logout = () => {
  const {
    showConfirmation,
    email,
    name,
    handleLogout,
    confirmLogout,
    cancelLogout,
  } = useLogout();

  return (
    <>
      <Button onClick={confirmLogout}>Log out</Button>
      <Modal
        open={showConfirmation}
        onClose={cancelLogout}
        title="Are you sure you want to log out?"
        isClose={true}
      >
        <Typography>
          Are you really want to log out of your account{" "}
          <strong>{email}</strong> ({name})?
        </Typography>
        <div className={styles.buttonLogout}>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={cancelLogout}>No</Button>
        </div>
      </Modal>
    </>
  );
};

export default Logout;