"use client";
import { Modal } from "../../modal";
import { ForgotPassword } from "@/shared/ui/modal/components/forgotPassword/ForgotPassword";

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
