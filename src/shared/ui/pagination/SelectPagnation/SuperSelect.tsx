"use client";
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./superSelect.module.css";
import image2 from "../../../../../public/cornerDown.svg";
import image1 from "../../../../../public/cornerTop.svg";

export const SuperSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={styles.select} onOpenChange={setOpen}>
        <Select.Value placeholder="Выберите элемент" />
        <img
          src={open ? image2.src : image1.src}
          alt="Custom Icon"
          className={styles.CustomIcon}
        />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.Content}
          sideOffset={0}
          position="popper"
        >
          {" "}
          {/* Устанавливаем side="bottom" */}
          <Select.ScrollUpButton className={styles.ScrollButton}>
            ↑
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.Viewport}>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={styles.Item}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.ScrollButton}>
            ↓
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
