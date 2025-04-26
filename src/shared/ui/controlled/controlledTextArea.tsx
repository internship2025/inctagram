"use client";

import { ComponentProps } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import styles from "@/shared/ui/input/input.module.css";

type Props<T extends FieldValues> = ComponentProps<"textarea"> &
  UseControllerProps<T> & {
    label?: string;
    disabled?: boolean;
  };

export const ControlledTextArea = <T extends FieldValues>({
  control,
  name,
  rules,
  className,
  label,
  disabled = false,
  ...props
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`${styles.textAreaWrapper} ${className}`}>
          <div>{label && <label className={styles.label}>{label}</label>}</div>
          <div>
            <textarea
              className={`${styles.textarea} ${error ? styles.error : ""} ${
                disabled ? styles.disabled : ""
              }`}
              disabled={disabled}
              {...field}
              {...props}
            />
          </div>
          <div>
            {error && <p className={styles.errorText}>{error.message}</p>}
          </div>
        </div>
      )}
    />
  );
};
