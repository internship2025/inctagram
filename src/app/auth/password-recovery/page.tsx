"use client";

import { ForgotPasswordModal } from "@/shared/ui/modal/components/forgotPasswordModal/forgotPasswordModal";
import { useState } from "react";

export default function PasswordRecoveryPage() {
  const [open, setOpen] = useState(true);

  return <ForgotPasswordModal open={open} onClose={() => setOpen(false)} />;
}
