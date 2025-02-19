"use client";
import { Modal } from "../../modal";
import { CreateNewPasswordForm } from "@/shared/ui/modal/components/CreateNewPasswordForm/CreateNewPasswordForm";

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
