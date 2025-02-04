import { ComponentProps } from "react";
import styles from "./button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "text" | "secondary";
};

export const Button = ({ variant = "primary", ...props }: Props) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return <button className={buttonClass} disabled={false} {...props} />;
};
