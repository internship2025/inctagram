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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignupMutation } from "@/features/auth/api/auth.api";
import { useState } from "react";
import { PATH } from "@/shared/constants/app-paths";

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
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required"),
    username: yup
      .string()
      .min(5, "Minimum number of characters 6")
      .max(31, "Maximum number of characters 30")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Minimum number of characters 6")
      .max(31, "Maximum number of characters 30")
      .required("Password is required"),
    passwordConfirmation: yup.string().required("Password is required"),
    approval: yup
      .boolean()
      .oneOf([true])
      .required("You have to agree to the terms"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  const [signup, { isLoading }] = useSignupMutation();
  const [modalOpen, setModalOpen] = useState(false);

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
          setModalOpen(true);
        });
    } catch (error) {}
  };

  let images = icons?.map((it, ind) => {
    return (
      <Link className={styles.images} key={ind} href={""}>
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </Link>
    );
  });

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
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
          {/* {errors.approval && (
            <span className={styles.error}>{errors.approval.message}</span>
          )} */}

          <span className={styles.text}>
            I agree to the{" "}
            <Link href={PATH.TERMS_OF_SERVICE}>Terms of Service</Link> and{" "}
            <Link href={PATH.PRIVACY_POLICY}>Privacy Policy</Link>
          </span>
        </div>
        <Button fullWidth>Sign Up</Button>
        <span className={styles.question}>Do you have an account?</span>
        <div>
          <Link href={PATH.SIGN_IN}>Sign In</Link>
        </div>
      </form>
    </>
  );
};
