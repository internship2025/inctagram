import { Modal } from "../../modal";
import { Notifications } from "./Notifications";
import styles from "./../../modal.module.css";

type Type = {
  open: boolean;
  onClose: () => void;
  items:
    | Array<{
        id: number;
        message: string;
        isRead: boolean;
        createdAt: string;
      }>
    | undefined;
  portalContainer?: HTMLDivElement | null;
};

export const NotificationsModal = ({
  open,
  onClose,
  items,
  portalContainer,
}: Type) => {
  return (
    <Modal
      portalContainer={portalContainer}
      className={styles.notification}
      open={open}
      onClose={onClose}
    >
      <Notifications notifications={items} />
      <div className={styles.modalTail}></div>
    </Modal>
  );
};
