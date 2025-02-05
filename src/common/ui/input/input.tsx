"use client";

import { ComponentProps, useState } from "react";
import styles from "./input.module.css";
import EyeIcon from "@/common/ui/input/eyeIcon/EyeIcon";

type InputType =
  | "text"
  | "password"
  | "email"
  | "tel"
  | "number"
  | "url"
  | "search";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showPassword?: boolean;
  type?: InputType;
};

export const Input = ({
  className,
  label,
  error,
  showPassword = false,
  type = "text",
  ...props
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputClass = `${styles.input} ${error ? styles.error : ""} ${className || ""}`;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType =
    showPassword && type === "password"
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          type={inputType}
          className={inputClass}
          placeholder={props.placeholder || ""}
          {...props}
        />
        {showPassword && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.togglePassword}
          >
            <EyeIcon />
          </button>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
