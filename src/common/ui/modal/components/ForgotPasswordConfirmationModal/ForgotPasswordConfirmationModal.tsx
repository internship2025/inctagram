'use client'
import { Modal } from "../../modal";
import { ForgotPasswordConfirmation } from "../ForgotPasswordConfirmation/ForgotPasswordConfirmation";

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
