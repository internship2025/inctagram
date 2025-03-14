"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../input/input";
import styles from "./signIn.module.css";
import Link from "next/link";
import { Button } from "../../../button/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  LoginArgs,
  useLazyMeQuery,
  useLoginMutation,
} from "@/features/auth/api/auth.api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIpSchema, SignInType } from "@/app/auth/types/schema";
import { PATH } from "@/shared/constants/app-paths";

type Type = {
  icons?:
    | Array<{
        src: string;
        width: number;
        height: number;
        onClick?: () => void;
      }>
    | [];
  onClose?: () => void;
};

export const SignIn = ({ icons }: Type) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signIpSchema),
    mode: "onBlur",
  });

  const [login] = useLoginMutation();
  const [getUser] = useLazyMeQuery();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin: SubmitHandler<SignInType> = async (data: LoginArgs) => {
    try {
      setErrorMessage(null);
      const response = await login(data).unwrap();
      console.log("Вход выполнен успешно:", response);

      if (response) {
        const accessToken = response.accessToken;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("email", data.email);
        }
        // Если вход успешен, получаем данные пользователя
        const userResponse = await getUser().unwrap();
        console.log("Данные пользователя:", userResponse);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      setErrorMessage("Неверный email или пароль");
    }
  };

  const images = icons?.map((it, ind) => {
    return (
      <button className={styles.btn} key={ind} onClick={it.onClick}>
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </button>
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
