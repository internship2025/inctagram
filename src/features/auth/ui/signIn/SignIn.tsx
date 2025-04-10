"use client";

import React from 'react';
import { Input } from "../../../../shared/ui/input/input";
import styles from "./signIn.module.css";
import Link from "next/link";
import { Button } from "../../../../shared/ui/button/button";
import { PATH } from "@/shared/constants/app-paths";
import { useSignIn } from "@/features/auth/ui/hooks/useSignIn";

type Props = {
  icons?:
    | Array<{
        icon: React.ComponentType<{ width: number; height: number }>;
        width: number;
        height: number;
        onClick?: () => void;
      }>
    | [];
};

export const SignIn = ({
  icons,
  formMethods,
}: Props & { formMethods: ReturnType<typeof useSignIn> }) => {
  const { register, handleSubmit, errors, handleLogin, errorMessage } =
    formMethods;

  const images = icons?.map((it, ind) => {
    return (
      <Button
        className={styles.btn}
        variant={"text"}
        key={ind}
        onClick={it.onClick}
      >
        {it.icon && React.createElement(it.icon, { width: it.width, height: it.height })}
      </Button>
    );
  });

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
      <form
        className={styles.wrapper}
        onSubmit={handleSubmit(handleLogin)}
        noValidate
      >
        <div className={styles.inputWrapper}>
          <Input label="Email" type="email" fullWidth {...register("email")} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <Input
            showPassword={true}
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.forgotPassword}>
          <Link href={PATH.PASSWORD_RECOVERY}>Forgot Password</Link>
        </div>
        <Button fullWidth>Sign In</Button>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <span className={styles.question}>Do you have an account?</span>
        <div>
          <Link href={PATH.SIGN_UP}>Sign Up</Link>
        </div>
      </form>
    </>
  );
};
