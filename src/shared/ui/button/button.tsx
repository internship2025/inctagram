import { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./button.module.css";
import { clsx } from "clsx";
import Link from "next/link";

export const buttonVariant = [
  "icon",
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
  href?: string;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">(
  props: ButtonProps<T>,
) => {
  const {
    as: Component = "button",
    className,
    fullWidth,
    variant = "primary",
    href,
    ...rest
  } = props;

  const classNames = clsx(
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    className,
  );

  if (href) {
    return <Link href={href} className={classNames} {...rest} />;
  }

  return <Component className={classNames} {...rest} />;
};
