import { Modal } from "../../modal";
import { Notifications } from "./Notifications";
import styles from "./../../modal.module.css";
import { Params } from "@/features/notifications/api/types";

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
  fetchNotifications: (params: Params)=> void
  hasMore: boolean
};

export const NotificationsModal = ({
  open,
  fetchNotifications,
  onClose,
  items,
  portalContainer,
  hasMore
}: Type) => {
  return (
    <Modal
      portalContainer={portalContainer}
      className={styles.notification}
      open={open}
      onClose={onClose}
    >
      <Notifications hasMore = {hasMore} fetchNotifications = {fetchNotifications} notifications = {items}/>
      <div className={styles.modalTail}></div>
    </Modal>
  );
};
