"use client";

import { Modal } from "../../../../shared/ui/modal/modal";
import { ForgotPassword } from "@/features/auth/ui/forgotPassword/ForgotPassword";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const ForgotPasswordModal = ({ open, onClose }: Type) => {
  return (
    <Modal title={"Forgot Password"} open={open} onClose={onClose}>
      <ForgotPassword />
    </Modal>
  );
};
