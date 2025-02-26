import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./ForgotPasswordConfirmation.module.css";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { useForgotPasswordConfirmationMutation } from "@/features/auth/api/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";

export type InputType = {
  email: string;
};

export const ForgotPasswordConfirmation = () => {

  const [forgotPasswordConfirmation, {isLoading}] = useForgotPasswordConfirmationMutation();
  const router = useRouter()
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  async function onSubmit(data: InputType) {
    try {
      await forgotPasswordConfirmation(data).unwrap(); 
      router.push(PATH.SIGN_IN);
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;
      if ("status" in fetchError && fetchError.status === 400) {
        setError("email", { 
          message: "Failed to send confirmation email. Please try again." 
        });
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Input
            error={errors?.email?.message}
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
          />
          {errors.email ? (
            <span className={styles.error}>{errors.email.message}</span>
          ) : (
            <p className={styles.text}>
              Enter your email address and we will send you further instructions
            </p>
          )}
        </div>
        <div className={styles.textWrapper}>
          <p>
            The link has been sent by email. If you don’t receive an email send
            link again
          </p>
        </div>
        <Button fullWidth disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Link Again"}
        </Button>
        <div className={styles.linkWrapper}>
          <Link href={PATH.SIGN_IN}>Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
};
