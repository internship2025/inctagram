"use client";
import * as React from "react";
import * as Select from "@radix-ui/react-select";
import styles from "./superSelect.module.css";
import image2 from "../../../../../public/cornerDown.svg";
import image1 from "../../../../../public/cornerTop.svg";

type OptionType = {
  value: string; // Значение опции
  label: string; // Отображаемый текст опции
};

type SuperSelectProps = {
  value: string; // Текущее значение
  onChange: (value: string) => void; // Функция для обработки изменения
  options: OptionType[]; // Массив опций
};

export const SuperSelect = ({ value, onChange, options }: SuperSelectProps) => {
  const [open, isOpen] = React.useState(false);

  return (
    <Select.Root
      value={value}
      onValueChange={onChange}
      onOpenChange={(open) => isOpen(open)}
    >
      <Select.Trigger className={styles.select} onOpenChange={isOpen}>
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
