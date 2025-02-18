import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./ForgotPasswordConfirmation.module.css";
import { Input } from "@/common/ui/input/input";
import { Button } from "@/common/ui/button/button";
import Link from "next/link";

export type InputType = {
  email: string;
};

export const ForgotPasswordConfirmation = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  function handler(data: InputType) {
    console.log(data);
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handler)}>
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
        <Button fullWidth>Send Link Again</Button>
        <div className={styles.linkWrapper}>
          <Link href="">Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
};
