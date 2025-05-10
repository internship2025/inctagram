import * as RadioGroup from "@radix-ui/react-radio-group";
import styles from './radioButton.module.css';
import { ComponentPropsWithoutRef } from "react";
import { AccountType } from "@/features/profile-settings/ui/account-menegment/hooks/useAccountType";
import { SubscriptionType } from "@/features/profile-settings/ui/account-menegment/hooks/useSubscriptionType";


type RadioButtonProps = {
  options: { value:  AccountType | SubscriptionType; label: string }[];
  disabled?: boolean;
  defaultValue?: AccountType | SubscriptionType;
  stylesOverride?:{
    direction?: string
  }
  onValueChange?: (value: AccountType | SubscriptionType) => void; 
} & Omit<ComponentPropsWithoutRef<typeof RadioGroup.Item>, "value">;

export const RadioButton = ({stylesOverride, options, disabled, defaultValue = options[1].value, onValueChange }: RadioButtonProps) => (
  <form>
    <RadioGroup.Root
      className={`${styles.Root} ${stylesOverride?.direction}`}
      defaultValue = {defaultValue}
      onValueChange={onValueChange}
      aria-label="Radio Button Group"
      disabled={disabled}
    >
      {options.map(({ value, label }) => (
        <div className={`${styles.RadioGroupItemWrapper}`} key={value}>
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
