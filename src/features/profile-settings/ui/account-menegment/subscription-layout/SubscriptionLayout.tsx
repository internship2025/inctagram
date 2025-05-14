import { ReactNode } from "react";
import s from "./SubscriptionLayout.module.css";

type Props = {
  children: () => ReactNode;
  title: string;
};

export const SubscriptionLayout = ({ children, title }: Props) => {
  return (
    <>
      <h3 className={s.title}>{title}:</h3>
      <div className={s.wrapper}>{children()}</div>
    </>
  );
};
