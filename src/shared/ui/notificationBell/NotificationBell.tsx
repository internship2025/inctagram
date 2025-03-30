import { useRef, useState } from "react";
import { NotificationsModal } from "../modal/components/notificationsModal/notificationsModal";
import { BellIcon } from "./BellIcon";
import { Button } from "../button/button";
import styles from "../button/button.module.css";
import { useGetNotificationQuery } from "@/features/auth/api/auth.api";
import s from './NotificationBell.module.css'

export const NotificationBell = () => {
  const { data, isFetching } = useGetNotificationQuery();

  const [isNotification, setIsNotification] = useState(false);
  const portalContainerRef = useRef(null);

  return (
    <div ref = {portalContainerRef} className={s.wrapper}>
      <Button style={{position: 'relative'}}
        className={styles.notificationButton}
        variant="text"
        onClick={() => {
          setIsNotification(true);
        }}
      >   
        <BellIcon count={data?.notReadCount} />
        
      </Button>
      <NotificationsModal items = {data?.items}
        open={isNotification}
        onClose={() => {
          setIsNotification(false);
        }}
        portalContainer = {portalContainerRef.current}
      />
    </div>
  );
};
