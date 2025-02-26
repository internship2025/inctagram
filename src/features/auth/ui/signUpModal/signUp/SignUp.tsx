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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@/features/auth/api/auth.api";
import { useState } from "react";
import { PATH } from "@/shared/constants/app-paths";
import { EmailSent } from "@/shared/ui/modal/components/emailSent/EmailSent";

export type InputType = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  approval: boolean;
};

type SignUp = {
  icons?: Array<{ src: string; width: number; height: number }> | [];
  onClose?: () => void;
};

export const SignUp = ({ icons }: SignUp) => {
  const schema = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("The email must match the format example@example.com"),
      username: z
        .string()
        .min(6, "Minimum number of characters 6")
        .max(30, "Maximum number of characters 30")
        .min(1, "Username is required")
        .regex(/^[a-zA-Z0-9_-]+$/, "Invalid username symbols"),
      password: z
        .string()
        .min(6, "Minimum number of characters 6")
        .max(30, "Maximum number of characters 30")
        .min(1, "Password is required")
        .regex(
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|"']).+$/,
          "Password must contain 0-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
        ),
      passwordConfirmation: z
        .string()
        .min(1, "Password confirmation is required"),
      approval: z.boolean().refine((val) => val, {
        message: "You have to agree to the terms",
      }),
    })
    .superRefine((data, ctx) => {
      if (data.passwordConfirmation !== data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords must match",
          path: ["passwordConfirmation"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<InputType>({ resolver: zodResolver(schema), mode: "onBlur" });

  const [signup, { isLoading }] = useSignupMutation();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const {
    field: { value, onChange },
  } = useController({ name: "approval", control });

  const signupHandler: SubmitHandler<InputType> = async (data) => {
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
      setError("root", { message: "Registration failed. Please try again." });
    }
  };

  let images = icons?.map((it, ind) => {
    return (
      <Link className={styles.images} key={ind} href={""}>
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </Link>
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
