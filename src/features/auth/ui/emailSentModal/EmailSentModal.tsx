"use client";

import { Modal } from "@/shared/ui/modal/modal";
import { EmailSent } from "@/features/auth/ui/emailSent/EmailSent";

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

export const EmailSentModal = ({ open, onClose, email }: Props) => {
  return (
    <Modal
      isClose
      className="indent"
      title={"Email sent"}
      open={open}
      onClose={onClose}
    >
      <EmailSent email={email} onClose={onClose} />
    </Modal>
  );
};
