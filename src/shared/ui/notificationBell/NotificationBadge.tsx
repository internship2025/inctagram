import s from "./NotificationBadge.module.css";

type NotificationBadge = {
  count: number | undefined
};

export const NotificationBadge = ({ count }: NotificationBadge) => {
  return <div className={s.circle}>{count ? count : 0}</div>;
};
