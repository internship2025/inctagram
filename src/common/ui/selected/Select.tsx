"use client";
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./select.module.css";
import image2 from "./../../../../public/cornerDown.svg";
import image1 from "./../../../../public/cornerTop.svg";

type SelectDemo = {
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  variant?: "var1" | "var2";
  className?: string;
};

export const SelectDemo = ({
  className,
  disabled = false,
  onValueChange,
  variant = "var1",
}: SelectDemo) => {
  const [open, isOpen] = React.useState(false);

  return (
    <Select.Root
      onOpenChange={(open) => isOpen(open)}
      onValueChange={onValueChange}
    >
      <Select.Trigger
      style={{marginLeft: '20px'}}
        className={`${styles.Trigger} ${open ? styles.open : ""}  ${styles[variant]} ${disabled ? styles.disabled : ""} ${className}`}
        disabled={disabled}
      >
        <Select.Value placeholder="Текст1" />
        <Select.Icon className={styles.Icon}>
          <img
            src={open ? image2.src : image1.src}
            alt="Custom Icon"
            className={styles.CustomIcon}
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          sideOffset={-1}
          // side="bottom"
          position="popper"
          className={styles.Content}
        >
          <Select.ScrollUpButton
            className={styles.ScrollButton}
          ></Select.ScrollUpButton>
          <Select.Viewport className={styles.Viewport}>
            <Select.Group>
              <Select.Item className={styles.Item} value="Текст1">
                <Select.ItemText>Текст1</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>

              <Select.Item className={styles.Item} value="Текст2">
                <Select.ItemText>Текст2</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>

              <Select.Item className={styles.Item} value="Текст3">
                <Select.ItemText>Текст3</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton
            className={styles.ScrollButton}
          ></Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
