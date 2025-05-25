export type NotificationItem = {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export type NotificationsType = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: NotificationItem[]; // Важно: массив, а не кортеж
}
export type Params = {
  cursor?: number;
  pageSize?: number;
  sortDirection?: "asc" | "desc";
  isRead?: boolean;
};

export enum WS_EVENT_PATH {
  RECEIVE_MESSAGE = "receive-message",
  UPDATE_MESSAGE = "update-message",
  MESSAGE_DELETED = "message-deleted",
  MESSAGE_SEND = "message-send",
  NOTIFICATIONS = "notifications",
  ERROR = "error",
}
