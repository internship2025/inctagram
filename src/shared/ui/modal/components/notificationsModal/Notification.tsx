import { calculatingDate } from "@/features/auth/utils/dateUtils";
import s from "./Notification.module.css";
import { forwardRef } from "react";

type NotificationType = {
  messages: {
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
  };
 id?: string;
 deel: (id: number)=> void
};

export const Notification = forwardRef<HTMLDivElement, NotificationType>(
  ({ messages, id, deel }, ref) => {
    return (
      <div
      onClick={()=> deel(messages.id)}
        ref={ref}
        id={id} // Устанавливаем ID элемента
        className={`${s.wrapper} ${!messages.isRead ? s.unread : ""}`}
      >
        <div>
          {messages.message}
          {!messages.isRead && <span className={s.new}> Новое</span>}
        </div>
        <div className={s.date}>{calculatingDate(messages.createdAt)}</div>
      </div>
    );
  }
);

Notification.displayName = "Notification";