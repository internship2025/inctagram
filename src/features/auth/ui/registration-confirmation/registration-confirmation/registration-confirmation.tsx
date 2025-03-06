"use client";

import { useSearchParams } from "next/navigation";
import { useConfirmEmailMutation } from "@/features/auth/api/auth.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import styles from "./registration.module.css";
import { EmailConfirmed } from "@/features/auth/ui/registration-confirmation/email-confirmed/email-confirmed";
import { LinkExpired } from "@/features/auth/ui/registration-confirmation/link-expired/linkExpired";

export const RegistrationConfirmation = () => {
  const searchParams = useSearchParams();

  const [confirmEmail, { isError, isLoading, isSuccess }] =
    useConfirmEmailMutation();

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      confirmEmail({ confirmationCode: code });
    } else {
      toast.error("Invalid confirmation code");
    }
  }, [confirmEmail, searchParams]);

  return (
    <div className={styles.container}>
      {isLoading && <ClipLoader color="#36d7b7" size={50} />}
      {isSuccess && <EmailConfirmed />}
      {isError && <LinkExpired />}
    </div>
  );
};
