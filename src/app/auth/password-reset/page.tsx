"use client";

import { useSearchParams, redirect } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";
import { ForgotPasswordConfirmationModal } from "@/shared/ui/modal/components/ForgotPasswordConfirmationModal/ForgotPasswordConfirmationModal";
import { useState, Suspense } from "react";

// Здесь нужно обернуть саму логику работы с параметрами в Suspense.
export default function PasswordResetPage() {
  const [open, setOpen] = useState(true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParams />
      <ForgotPasswordConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </Suspense>
  );
}

// Новый компонент, который использует useSearchParams внутри Suspense
function SearchParams() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // Если нет email, редиректим на страницу восстановления пароля
  if (!email) {
    redirect(PATH.PASSWORD_RECOVERY);
  }

  return null; // Компонент не рендерит ничего, он только выполняет логику поиска
}
