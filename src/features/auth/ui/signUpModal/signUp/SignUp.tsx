"use client";

import {
  useForm,
  SubmitHandler,
  Controller,
  useController,
} from "react-hook-form";
import styles from "./signUp.module.css";
import { Input } from "@/shared/ui/input/input";
import { CheckBox } from "@/shared/ui/checkBox/checkBox";
import { Button } from "@/shared/ui/button/button";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@/features/auth/api/auth.api";
import { useState } from "react";
import { PATH } from "@/shared/constants/app-paths";
import { EmailSent } from "@/shared/ui/modal/components/emailSent/EmailSent";
import { signUpSchema, SignUpType } from "@/app/auth/types/schema";

type SignUp = {
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

export const SignUp = ({ icons }: SignUp) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const [signup, { isLoading }] = useSignupMutation();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const {
    field: { value, onChange },
  } = useController({ name: "approval", control });

  const signupHandler: SubmitHandler<SignUpType> = async (data) => {
    try {
      await signup({
        userName: data.username,
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .then(() => {
          setUserEmail(data.email);
          setIsFormVisible(false);
        });
    } catch (error) {
      if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Registration failed. Please try again." });
      }
    }
  };

  const images = icons?.map((it, ind) => {
    return (
      <button className={styles.btn} key={ind} onClick={it.onClick}>
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </button>
    );
  });
  const isButtonDisabled = !isValid || !isDirty || !value;

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
      {isFormVisible && (
        <form
          className={styles.wrapper}
          onSubmit={handleSubmit(signupHandler)}
          noValidate
        >
          <div className={styles.inputWrapper}>
            <Input
              error={errors?.username?.message}
              label="Username"
              fullWidth
              {...register("username")}
            />
            {errors.username && (
              <span className={styles.error}>{errors.username.message}</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
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
          <div className={styles.inputWrapper}>
            <Input
              error={errors?.password?.message}
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
          <div className={styles.inputWrapper}>
            <Input
              error={errors?.passwordConfirmation?.message}
              showPassword={true}
              label="Password confirmation"
              type="password"
              fullWidth
              {...register("passwordConfirmation")}
            />

            {errors.passwordConfirmation && (
              <span className={styles.error}>
                {errors.passwordConfirmation.message}
              </span>
            )}
          </div>
          <div className={styles.policy}>
            <Controller
              name="approval"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CheckBox {...field} checked={value} onChange={onChange} />
              )}
            />
            {errors.approval && (
              <span className={styles.error}>{errors.approval.message}</span>
            )}

            <span className={styles.text}>
              I agree to the{" "}
              <Link href={PATH.TERMS_OF_SERVICE}>Terms of Service</Link> and{" "}
              <Link href={PATH.PRIVACY_POLICY}>Privacy Policy</Link>
            </span>
          </div>
          <Button fullWidth disabled={isButtonDisabled || isLoading}>
            Sign Up
          </Button>
          <span className={styles.question}>Do you have an account?</span>
          <div>
            <Link href={PATH.SIGN_IN}>Sign In</Link>
          </div>
        </form>
      )}
      {!isFormVisible && (
        <EmailSent email={userEmail} onClose={() => setIsFormVisible(true)} />
      )}
    </>
  );
};
