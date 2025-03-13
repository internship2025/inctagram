"use client";

import { Modal } from "../../modal";
import { EmailSent } from "@/shared/ui/modal/components/emailSent/EmailSent";

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
