"use client";

import { useSearchParams, redirect } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";
import { ForgotPasswordConfirmationModal } from "@/features/auth/ui/ForgotPasswordConfirmationModal/ForgotPasswordConfirmationModal";
import { useState } from "react";

export function PasswordResetClient() {
  const [open, setOpen] = useState(true);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Если нет email, редиректим на страницу восстановления пароля
  if (!email) {
    redirect(PATH.PASSWORD_RECOVERY);
  }

  return (
    <ForgotPasswordConfirmationModal
      open={open}
      onClose={() => setOpen(false)}
    />
  );
}
