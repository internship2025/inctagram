import { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./button.module.css";
import { clsx } from "clsx";

export const buttonVariant = [
  "icon",
  "link",
  "primary",
  "secondary",
  "outline",
  "text",
] as const;

export type ButtonVariant = (typeof buttonVariant)[number];

export type ButtonProps<T extends ElementType = "button"> = {
  as?: T;
  fullWidth?: boolean;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T>,
) => {
  const {
    as: Component = "button",
    className,
    fullWidth,
    variant = "primary",
    ...rest
  } = props;

  const classNames = clsx(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  );

  return <Component className={classNames} {...rest} />;
};
