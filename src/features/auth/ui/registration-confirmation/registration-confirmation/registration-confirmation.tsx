"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useConfirmEmailMutation } from "@/features/auth/api/auth.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import styles from "./registration.module.css";
import { EmailConfirmed } from "@/features/auth/ui/registration-confirmation/email-confirmed/email-confirmed";
import { Typography } from "@/shared/ui/typography/typography";

export const RegistrationConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [confirmEmail, { isError, isLoading, isSuccess }] =
    useConfirmEmailMutation();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      confirmEmail({ confirmationCode: code })
        .then(() => {
          router.push("/auth/email-confirmed");
        })
        .catch(() => {
          toast.error("Error confirming email");
        });
    } else {
      toast.error("Invalid confirmation code");
    }
  }, [confirmEmail, searchParams]);

  return (
    <div className={styles.container}>
      {isLoading && <ClipLoader color="#36d7b7" size={50} />}
      {isSuccess && <EmailConfirmed />}
      {isError && (
        <Typography className={styles.errorText}>
          Error confirming email
        </Typography>
      )}
    </div>
  );
};
