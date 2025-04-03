"use client";

import { useSearchParams } from "next/navigation";
import { useResendConfirmationMutation } from "@/features/auth/api/auth.api";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./linkExpired.module.css";
import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";
import Image from "next/image";
import { Modal } from "@/shared/ui/modal/modal";
import { EmailSent } from "@/features/auth/ui/emailSent/EmailSent";

export const LinkExpired = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email") || "";

  const [resendConfirmation, { isLoading }] = useResendConfirmationMutation();

  const [modalOpen, setModalOpen] = useState(false);

  const onResendHandler = async () => {
    if (email && code) {
      try {
        await resendConfirmation({ email })
          .unwrap()
          .then(() => {
            setModalOpen(true);
          });
      } catch (error: unknown) {
        console.log(`Error: ${error}`);
      }
    } else {
      toast.error("link error");
    }
  };

  return (
    <div className={styles.linkExpiredContainer}>
      {isLoading && <Typography>Loading...</Typography>}
      <Typography className={styles.linkExpiredTitle}>
        Email verification link expired
      </Typography>
      <Typography className={styles.linkExpiredDescription}>
        Looks like the verification link has expired. Not to worry, we can send
        the link again
      </Typography>
      <Button
        onClick={onResendHandler}
        variant={"primary"}
        className={styles.resendHandlerButton}
      >
        Resend verification link
      </Button>
      <Image
        alt={"expired image"}
        height={352}
        src={"/images/expired.svg"}
        width={474}
        className={styles.expiredImage}
      />
      <Modal open={modalOpen}>
        <EmailSent email={email} />
      </Modal>
    </div>
  );
};
