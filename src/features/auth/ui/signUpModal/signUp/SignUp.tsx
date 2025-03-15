"use client";

import { Controller } from "react-hook-form";
import styles from "./signUp.module.css";
import { Input } from "@/shared/ui/input/input";
import { CheckBox } from "@/shared/ui/checkBox/checkBox";
import { Button } from "@/shared/ui/button/button";
import Image from "next/image";
import Link from "next/link";
import { PATH } from "@/shared/constants/app-paths";
import { EmailSent } from "@/shared/ui/modal/components/emailSent/EmailSent";
import { useSignUp } from "@/features/auth/ui/hooks/useSignUp";
import { Typography } from "@/shared/ui/typography/typography";

type Props = {
  icons?:
    | Array<{
        src: string;
        width: number;
        height: number;
        onClick?: () => void;
      }>
    | [];
};

export const SignUp = ({
  icons,
  formMethods,
}: Props & { formMethods: ReturnType<typeof useSignUp> }) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isDirty,
    isLoading,
    isFormVisible,
    userEmail,
    setIsFormVisible,
    signupHandler,
    value,
    onChange,
  } = formMethods;

  const images = icons?.map((it, ind) => {
    return (
      <Button
        className={styles.btn}
        variant={"text"}
        key={ind}
        onClick={it.onClick}
      >
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </Button>
    );
  });

  const isButtonDisabled = !isValid || !isDirty || !value;

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
      {isFormVisible ? (
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
              placeholder={"******************"}
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
              placeholder={"******************"}
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
              <Typography className={styles.error}>
                {errors.approval.message}
              </Typography>
            )}
            <Typography className={styles.policyAgreement} variant={"span"}>
              I agree to the
              <Link
                className={styles.policylink}
                href={PATH.TERMS_OF_SERVICE}
                onClick={() => {
                  setIsFormVisible(false);
                }}
              >
                {" "}
                Terms of Service{" "}
              </Link>{" "}
              and{" "}
              <Link
                className={styles.policylink}
                href={PATH.PRIVACY_POLICY}
                onClick={() => {
                  setIsFormVisible(false);
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
          </div>
          <Button fullWidth disabled={isButtonDisabled || isLoading}>
            Sign Up
          </Button>
          <span className={styles.question}>Do you have an account?</span>
          <div>
            <Link className={styles.signInLink} href={PATH.SIGN_IN}>
              Sign In
            </Link>
          </div>
        </form>
      ) : (
        <EmailSent email={userEmail} onClose={() => setIsFormVisible(true)} />
      )}
    </>
  );
};
