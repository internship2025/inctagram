import styles from "./checkBox.module.css";
import { Checkbox } from "radix-ui";
import { ComponentProps, useState } from "react";
import CheckmarkIcon from "@/common/ui/checkBox/components/CheckmarkIcon";

type Props = ComponentProps<"input"> & {
  variant?: "default" | "disable";
  disabled?: boolean;
  txt?: string;
};

export const CheckBox = ({
  variant = "default",
  disabled = false,
  txt,
  ...props
}: Props) => {
  const [checked, setChecked] = useState(false);
  const checkedHandler = (checked) => {
    if (!disabled) {
      setChecked(checked);
    }
  };

  return (
    <div className={styles.container}>
      <Checkbox.Root
        className={`${styles.Root} ${disabled ? styles.disabled : ""}`}
        onCheckedChange={checkedHandler}
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
