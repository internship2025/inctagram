"use client";

import { Modal } from "../../../../shared/ui/modal/modal";
import { ForgotPasswordConfirmation } from "@/features/auth/ui/ForgotPasswordConfirmation/ForgotPasswordConfirmation";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const ForgotPasswordConfirmationModal = ({ open, onClose }: Type) => {
  return (
    <Modal title={"Forgot Password"} open={open} onClose={onClose}>
      <ForgotPasswordConfirmation />
    </Modal>
  );
};
