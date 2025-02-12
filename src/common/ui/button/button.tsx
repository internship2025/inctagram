import { ComponentProps } from "react";
import styles from "./button.module.css";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "text" | "secondary";
};

export const Button = ({ variant = "primary", ...props }: Props) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return <button className={buttonClass} disabled={false} {...props} />;
};

// import { ComponentPropsWithoutRef, ElementType } from 'react'
//
// import { clsx } from 'clsx'
//
// import s from './button.module.scss'
//
// export const buttonVariant = [
//   'icon',
//   'link',
//   'primary',
//   'secondary',
//   'tertiary',
//   'disabled',
// ] as const
//
// export type ButtonVariant = (typeof buttonVariant)[number]
//
// export type ButtonProps<T extends ElementType = 'button'> = {
//   as?: T
//   fullWidth?: boolean
//   variant?: ButtonVariant
// } & ComponentPropsWithoutRef<T>
//
// export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
//   const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props
//
//   const classNames = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)
//
//   return <Component className={classNames} {...rest} />
// }
