"use client";

import Image from "next/image";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import styles from "./avatar.module.css";
import { SvgImageOutline } from "@/assets/icons/components/ImageOutline";

type AvatarOwnProps = {
  onClick?: () => void;
  size?: 6 | 9 | 12 | 48;
  src?: string;
};

type AvatarProps = AvatarOwnProps &
  Omit<ComponentPropsWithoutRef<typeof Image>, "src">;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { alt = "Profile avatar", className, height, onClick, size, src, width },
    ref,
  ) => {
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
