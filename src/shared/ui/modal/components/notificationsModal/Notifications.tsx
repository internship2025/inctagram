import { NotificationsType } from "@/features/auth/api/auth.api";
import s from "./Notifications.module.css";
import { Notification } from "./Notification";

type Notifications = {
  notifications: Array<{
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;

};

export const Notifications = ({ notifications }: Notifications) => {
  const notification = notifications?.map((it) => {
    return <Notification key = {it.id} messages = {it}/>;
  });

  return <div className={s.wrapper}>
    <div className={s.text}>Уведомления</div>
    {/* {!notification.length ? <div>Уведомлений нет</div> : notification} */}
    </div>;
};
