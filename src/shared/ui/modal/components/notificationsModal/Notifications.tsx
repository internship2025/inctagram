import { NotificationsType } from "@/features/auth/api/auth.api";

import { Notification } from "./Notification";

import * as React from "react";
import { ScrollArea } from "radix-ui";

import styles from "./Notifications.module.css";

type Notifications = {
  notifications: Array<{
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
};


export const Notifications = ({ notifications }: Notifications) => {


	// Тэстовые данные
	notifications = [   {
		"id": 1,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  },    {
		"id": 2,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  },    {
		"id": 3,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  },    {
		"id": 4,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  },    {
		"id": 5,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  },    {
		"id": 6,
		"message": "Your next payment will be debited in 1 day",
		"isRead": true,
		"createdAt": "2025-03-29T20:00:12.597Z"
	  }]


  return (
    <ScrollArea.Root className={styles.Root}>
      <ScrollArea.Viewport className={styles.Viewport}>
        <div className={styles.wrapperNotifications}>
          <div className={styles.Text}>Уведомления</div>
          {notifications.map((it) => (
			<Notification key={it.id}  messages = {it}/>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar} orientation="vertical">
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={styles.Scrollbar}
        orientation="horizontal"
      >
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={styles.Corner} />
    </ScrollArea.Root>
  );
};
