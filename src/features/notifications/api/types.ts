export type NotificationsType = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: [
    {
      id: number;
      message: string;
      isRead: boolean;
      createdAt: string;
    },
  ];
};
