import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "secondary";
};

export const Button = ({ variant = "primary", ...props }: Props) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button
      className={buttonClass}
      disabled={variant === "secondary"}
      {...props}
    />
  );
};
