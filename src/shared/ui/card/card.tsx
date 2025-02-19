import { ReactNode } from "react";
import styles from "./card.module.scss";
import { clsx } from "clsx";

type PropsType = {
  children?: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: PropsType) => {
  const classNames = { container: clsx(styles.container, className || "") };

  return <div className={classNames.container}>{children}</div>;
};
