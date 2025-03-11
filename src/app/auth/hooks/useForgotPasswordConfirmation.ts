import { useForgotPasswordConfirmationMutation } from "@/features/auth/api/auth.api";
import { PATH } from "@/shared/constants/app-paths";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { baseUrl } from "@/shared/constants/app-paths";
import { emailSchema, ConfirmationType } from "../types/schema";

export const useForgotPasswordConfirmation = () => {
  const [forgotPasswordConfirmation, { isLoading }] =
    useForgotPasswordConfirmationMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push(PATH.PASSWORD_RECOVERY);
    }
  }, [email, router]);

  const form = useForm<ConfirmationType>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  });

  async function onSubmit(data: ConfirmationType) {
    try {
      await forgotPasswordConfirmation({
        email: data.email,
        baseUrl: baseUrl,
      }).unwrap();
      router.push(PATH.SIGN_IN);
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;
      if ("status" in fetchError && fetchError.status === 400) {
        form.setError("email", {
          message: "Failed to send confirmation email. Please try again.",
        });
      }
    }
  }
  return {
    form,
    onSubmit,
    isLoading,
    email,
  };
};
