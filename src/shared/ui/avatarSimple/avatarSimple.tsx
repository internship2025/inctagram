import { ComponentPropsWithoutRef, forwardRef } from "react";
import { Avatar } from "radix-ui";
import s from "./avatar.module.css";

type Props = {
  size?: "large" | "small";
  src?: string;
  title: string;
} & ComponentPropsWithoutRef<typeof Avatar.Root>;

export const AvatarSimple = forwardRef<HTMLSpanElement, Props>(
  ({ className, size = "small", src, title, ...rest }, ref) => {
    return (
      <Avatar.Root
        className={`${s.root} ${s[size]} ${className}`}
        ref={ref}
        {...rest}
      >
        <Avatar.Image alt={"avatar"} className={s.image} src={src} />
        <Avatar.Fallback className={s.fallback} delayMs={600}>
          {title}
        </Avatar.Fallback>
      </Avatar.Root>
    );
  },
);

AvatarSimple.displayName = "AvatarSimple";
