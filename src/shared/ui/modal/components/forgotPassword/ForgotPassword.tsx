import { Input } from "@/shared/ui//input/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./forgotPassword.module.css";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { useState, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { EmailSentModal } from "../emailSentModal/EmailSentModal";
import { PATH, baseUrl } from "@/shared/constants/app-paths";
import ReCAPTCHA from "react-google-recaptcha";

export type InputType = {
  email: string;
};

export const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,    
    watch,
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  const email = watch("email");
  const isButtonDisabled = !email || !recaptchaValue || isLoading;

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
    if (errors.email?.message === "Please complete the reCAPTCHA verification") {
      setError("email", { message: undefined });
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaValue(null);
    recaptchaRef.current?.reset();
  };

  const handleRecaptchaError = () => {
    setRecaptchaValue(null);
    setError("email", { 
      message: "reCAPTCHA verification failed. Please try again." 
    });
  };

  async function onSubmit(data: InputType) {    
    try {
      if (!recaptchaValue) {
        setError("email", { 
          message: "Please complete the reCAPTCHA verification" 
        });
        return;
      }

      await forgotPassword({
        email: data.email,
        recaptcha: recaptchaValue,
        baseUrl: baseUrl
      }).unwrap();
      setSentEmail(data.email);
      setShowEmailSentModal(true);
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;
      setError("email", { 
        message: "User with this email doesn't exist" 
      });
      // Сбрасываем капчу при ошибке
      recaptchaRef.current?.reset();
      setRecaptchaValue(null);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="Epam@epam.com"
              error={errors?.email?.message}
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.textWrapper}>
            <span>
              Enter your email address and we will send you further instructions
            </span>
          </div>

          <Button fullWidth disabled={isButtonDisabled}>
            {isLoading ? "Sending..." : "Send Link"}
          </Button>

          <div className={styles.linkWrapper}>
            <Link href={PATH.SIGN_IN}>Back to Sign In</Link>
          </div>

          <div className={styles.recaptchaWrapper}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LfpOuMqAAAAAE9xTZ1PP4CH-WUsTq5al9vEw0nJ"
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired}
              className={styles.recaptcha}
              theme="dark"
              onError={handleRecaptchaError}
              size="normal"
            />
          </div>
        </form>
      </div>
      <EmailSentModal
        open={showEmailSentModal}
        onClose={() => setShowEmailSentModal(false)}
        email={sentEmail}
      />
    </>
  );
};
