import * as RadioGroup from "@radix-ui/react-radio-group";
import styles from './radioButton.module.css';
import { ComponentPropsWithoutRef } from "react";

type RadioButtonProps = {
  options: { value: string; label: string }[];
  disabled?: boolean;
} & ComponentPropsWithoutRef<'button'>;

export const RadioButton = ({ options, disabled }: RadioButtonProps) => (
  <form>
    <RadioGroup.Root
      className={styles.Root}
      defaultValue={options[0]?.value}
      aria-label="Radio Button Group"
      disabled={disabled}
    >
      {options.map(({ value, label }) => (
        <div className={styles.RadioGroupItemWrapper} key={value}>
          <RadioGroup.Item
            className={styles.Item}
            value={value}
            id={value}
            disabled={disabled}
          >
            <RadioGroup.Indicator className={styles.Indicator} />
          </RadioGroup.Item>
          <label
            className={`${styles.Label} ${disabled ? styles.DisabledLabel : ''}`}
            htmlFor={value}
          >
            {label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  </form>
);
