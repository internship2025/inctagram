import { ComponentProps, useState } from "react";
import styles from "./input.module.css";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  showPassword?: boolean;
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

  const inputClass = `${styles.input} ${error ? styles.error : ""}`;

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
    <div>
      {label && <label>{label}</label>}
      <div>
        <input
          type="text"
          className={inputClass}
          placeholder={props.placeholder || ""}
          {...props}
        />
        {showPassword && type === "password"}
      </div>
    </div>
  );
};
