import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import styles from "./textLink.module.css";

type TextLinkOwnProps = {
  asChild?: ReactNode;
};

type TextLinkProps = ComponentPropsWithoutRef<typeof Link> &
  TextLinkOwnProps & {
    color?: "primary" | "regular";
    size?: "large" | "medium" | "small";
    underline?: boolean;
  };

const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>((props, ref) => {
  const {
    asChild = false,
    className,
    color = "primary",
    size = "medium",
    underline = true,
    ...restProps
  } = props;

  const Component = asChild ? Slot : Link;

  const linkClassNames = cn(
    styles.textLink,
    color === "primary" ? styles.textPrimary : styles.textRegular,
    size === "large"
      ? styles.textLarge
      : size === "medium"
        ? styles.textMedium
        : styles.textSmall,
    underline ? styles.underline : styles.noUnderline,
    className,
    styles.focusVisible,
  );

  return <Component className={linkClassNames} {...restProps} ref={ref} />;
});

TextLink.displayName = "TextLink";

export { TextLink };
