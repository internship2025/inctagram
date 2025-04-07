"use client";

import Image from "next/image";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import styles from "./avatar.module.css";
import { SvgImageOutline } from "@/assets/icons/components/ImageOutline";

type AvatarOwnProps = {
  onClick?: () => void;
  size: 6 | 9 | 12 | 48;
  src?: string;
};

type AvatarProps = AvatarOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Image>, "src">;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      alt = "Profile avatar",
      className,
      height,
      onClick,
      size,
      src,
      width,
      ...props
    },
    ref,
  ) => {
    const iconSizeMap: Record<AvatarOwnProps["size"], string> = {
      6: "w-6 h-6",
      9: "w-6 h-6",
      12: "w-9 h-9",
      48: "w-12 h-12",
    };

    const containerSizeMap: Record<AvatarOwnProps["size"], string> = {
      6: "h-6 w-6",
      9: "h-9 w-9",
      12: "h-12 w-12",
      48: "h-48 w-48",
    };
    return (
      <RadixAvatar.Root
        className={styles.rootAvatar}
        onClick={onClick}
        ref={ref}
      >
        {src ? (
          <Image
            className={styles.imageAvatar}
            src={src}
            alt={alt}
            height={height || 48}
            width={width || 48}
          />
        ) : (
          <SvgImageOutline className={styles.svgImageOutline} />
        )}
      </RadixAvatar.Root>
    );
  },
);
