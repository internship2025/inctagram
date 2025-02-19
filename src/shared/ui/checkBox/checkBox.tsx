import styles from "./checkBox.module.css";
import { Checkbox } from "radix-ui";
import { ComponentProps } from "react";
import CheckmarkIcon from "@/shared/ui/checkBox/components/CheckmarkIcon";

type Props = Omit<ComponentProps<"input">, "value"> & {
  variant?: "default" | "disable";
  disabled?: boolean;
  txt?: string;
  onChange: (checked: boolean) => void; // Кастомный onChange
  checked: boolean; // checked обязателен
};

export const CheckBox = ({
  variant = "default",
  disabled = false,
  txt,
  onChange,
  checked,
  ...props
}: Props) => {
  return (
    <div className={styles.container}>
      <Checkbox.Root
        className={`${styles.Root} ${disabled ? styles.disabled : ""}`}
        onCheckedChange={onChange}
        checked={checked}
        data-disabled={disabled}
        disabled={disabled}
        id="ch1"
      >
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckmarkIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={`${styles.Label} ${disabled ? styles.disabled : ""}`}
        htmlFor="ch1"
      >
        {txt && <span>{txt}</span>}
      </label>
    </div>
  );
};
