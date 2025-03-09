import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./CreateNewPasswordForm.module.css";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { useCreateNewPasswordMutation } from "@/features/auth/api/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PATH } from "@/shared/constants/app-paths";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const passwordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(
      /[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
      "Password must contain at least one special character (!@#$%^&* etc.)",
    ),
  passwordConfirmation: z.string().min(1, "Password confirmation is required"),
});

type InputType = z.infer<typeof passwordSchema>;

export const CreateNewPasswordForm = () => {
  const [createNewPassword, { isLoading, isSuccess }] =
    useCreateNewPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      router.push(PATH.PASSWORD_RECOVERY);
    }
  }, [code, router]);

  const schema = passwordSchema.refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: "Passwords must match",
      path: ["passwordConfirmation"],
    },
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputType>({ resolver: zodResolver(schema), mode: "onBlur" });

  async function onSubmit(data: InputType) {
    try {
      await createNewPassword({
        newPassword: data.password,
        recoveryCode: code as string,
      }).unwrap();
      // Очищаем локальное хранилище
      localStorage.removeItem("access_token");
      // Редирект на страницу логина
      router.push(PATH.SIGN_IN);
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;
      if ("status" in fetchError && fetchError.status === 400) {
        setError("password", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.passwordConfirmation ? (
            <p className={styles.error}>
              {errors.passwordConfirmation.message}
            </p>
          ) : (
            <p className={styles.text}>
              Your password must be between 6 and 20 characters
            </p>
          )}
        </div>
        <Button fullWidth disabled={isLoading}>
          {isLoading ? "Creating..." : "Create new password"}
        </Button>
      </form>
    </div>
  );
};
