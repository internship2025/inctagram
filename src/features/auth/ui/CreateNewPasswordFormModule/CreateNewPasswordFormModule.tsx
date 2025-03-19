"use client";

import { Modal } from "@/shared/ui/modal/modal";
import { CreateNewPasswordForm } from "@/features/auth/ui/CreateNewPasswordForm/CreateNewPasswordForm";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const CreateNewPasswordFormModule = ({ open, onClose }: Type) => {
  return (
    <Modal title="Create New Password" open={open} onClose={onClose}>
      <CreateNewPasswordForm />
    </Modal>
  );
};
