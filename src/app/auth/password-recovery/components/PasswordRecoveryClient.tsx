"use client";

import { ForgotPasswordModal } from "@/features/auth/ui/forgotPasswordModal/forgotPasswordModal";
import { useState } from "react";

export function PasswordRecoveryClient() {
  const [open, setOpen] = useState(true);

  return <ForgotPasswordModal open={open} onClose={() => setOpen(false)} />;
}
