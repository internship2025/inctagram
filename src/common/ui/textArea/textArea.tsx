"use client";

import { ComponentProps } from "react";
import styles from "@/common/ui/input/input.module.css";

type Props = ComponentProps<"textarea"> & {
  label?: string;
  error?: string;
  disabled?: boolean;
};

export const TextArea = ({
  className,
  error,
  label,
  disabled = false,
  ...props
}: Props) => {
  return (
    <div className={`${styles.textAreaWrapper} ${className}`}>
      <div>{label && <label className={styles.label}>{label}</label>}</div>
      <div>
        <textarea
          className={`${styles.textarea} ${error ? styles.error : ""} ${disabled ? styles.disabled : ""}`}
          disabled={disabled}
          {...props}
        />
      </div>
      <div>{error && <p className={styles.errorText}>{error}</p>}</div>
    </div>
  );
};
