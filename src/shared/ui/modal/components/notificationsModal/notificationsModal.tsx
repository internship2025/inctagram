import { NotificationsType } from "@/features/auth/api/auth.api";
import { Modal } from "../../modal";
import { Notifications } from "./Notifications";
import styles from './../../modal.module.css'

type Type = {
    open: boolean
    onClose: () => void
    items: Array<{
        id: number;
        message: string;
        isRead: boolean;
        createdAt: string;
      }>;
  };
  

export const NotificationsModal = ({ open, onClose, items}: Type) => {


  return (
    <div style={{position: 'absolute'}}>
    <Modal className={styles.notification} open={open} onClose={onClose}>
     <Notifications notifications = {items}/>
     <div className={styles.modalTail}></div> 
    </Modal>
    </div>
  );
};
