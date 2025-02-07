"use client";

import { ComponentProps, useState } from "react";
import styles from "./input.module.css";
import EyeIcon from "@/common/ui/input/components/EyeIcon";
import Image from "next/image";
import searchIco from "./assets/searchIco.svg";

type InputType = "text" | "password" | "email" | "search";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showPassword?: boolean;
  type?: InputType;
  disabled?: boolean;
};

export const Input = ({
  className,
  label,
  error,
  showPassword = false,
  type = "text",
  disabled = false,
  ...props
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputClass = `${styles.input} ${error ? styles.error : ""} ${type === "password" && error ? styles.errorPassword : ""} ${disabled ? styles.disabled : ""} ${type === "search" ? styles.search : ""} ${className || ""}`;

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
        {type === "search" && !disabled && (
          <div className={styles.searchInputContainer}>
            <Image src={searchIco} alt="SearchIcon" width={20} height={20} />
          </div>
        )}
        <input
          type={inputType}
          className={inputClass}
          placeholder={props.placeholder || ""}
          {...props}
        />
        {showPassword && type === "password" && !disabled && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.togglePassword}
            disabled={disabled}
          >
            <EyeIcon />
          </button>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
