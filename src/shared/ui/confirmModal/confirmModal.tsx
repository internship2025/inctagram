import * as React from "react";
import { Modal } from "@/shared/ui/modal/modal";
import { Button } from "@/shared/ui/button/button";
import s from "./confirm-modal.module.css";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  confirmText: string;
  cancelText: string;
  isLoading?: boolean;
  children: React.ReactNode;
  isClose?: boolean;
};

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  confirmText,
  cancelText,
  isLoading = false,
  children,
  isClose = true,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      isClose={isClose}
      className={s.modal}
    >
      <div className={s.root}>
        {children}

        <div className={s.controller}>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>

          <Button onClick={onConfirm} disabled={isLoading} color="error">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
