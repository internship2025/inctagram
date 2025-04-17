import { Modal } from "@/shared/ui/modal/modal";
import { Status } from "./Status";

type Props = {
  open: boolean;
  onClose?: () => void;
  message: string;
};

export const NotificationModal = ({ message, open, onClose }: Props) => {
  return (
    <Modal  open={open} onClose={onClose}>
      <Status onClose={onClose} message = {message}/>
    </Modal>
  );
};
