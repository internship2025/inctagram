"use client";
import { Modal } from "../../modal";
import { ForgotPasswordConfirmation } from "@/shared/ui/modal/components/ForgotPasswordConfirmation/ForgotPasswordConfirmation";

type Type = {
  open: boolean;
  onClose: () => void;
  title?: string
};

export const ForgotPasswordConfirmationModal = ({title = "Forgot Password", open, onClose }: Type) => {
  return (
    <Modal title={title} open={open} onClose={onClose}>
      <ForgotPasswordConfirmation />
    </Modal>
  );
};
