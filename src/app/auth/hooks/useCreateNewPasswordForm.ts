import { useCreateNewPasswordMutation } from "@/features/auth/api/auth.api";
import { PATH } from "@/shared/constants/app-paths";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNewPasswordFormType, createNewPasswordSchema } from "../types/schema";

export const useCreateNewPasswordForm = () => {
  const [createNewPassword, { isLoading, isSuccess }] = useCreateNewPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      router.push(PATH.PASSWORD_RECOVERY);
    }
  }, [code, router]);

  const schema = createNewPasswordSchema.refine(
    (data) => data.password === data.passwordConfirmation,
    {
      message: "Passwords must match",
      path: ["passwordConfirmation"],
    },
  );

  const form = useForm<CreateNewPasswordFormType>({ resolver: zodResolver(schema), mode: "onBlur" });

  async function onSubmit(data: CreateNewPasswordFormType) {
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
        form.setError("password", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }

  return {
    form,
    onSubmit,
    isLoading,
    isSuccess,
  };
}