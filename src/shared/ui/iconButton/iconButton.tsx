import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import styles from "./IconButton.module.css";

type Props = ComponentPropsWithoutRef<"button"> & {
  disabled?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, className, disabled, ...restProps } = props;

  const buttonClass = cn(
    styles.iconButton, // Основной класс
    disabled && styles.iconButtonDisabled, // Добавляем класс для disabled
    className, // Дополнительные классы, переданные через пропс
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
});

IconButton.displayName = "IconButton";

export { IconButton, type Props };
