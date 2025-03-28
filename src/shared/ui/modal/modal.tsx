"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.css";
import Image from "next/image";
import close from "@/shared/ui/modal/assets/close.svg";

type Modal = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  marginTop?: number;
  textAlign?: "left" | "right" | "center";
  open?: boolean;
  onClose?: () => void;
  isClose?: boolean;
};

export const Modal = ({
  children,
  className = "",
  title,
  open = true,
  onClose,
  isClose = false,
}: Modal) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={`${styles.commonStyles} ${className}`}>
          <Dialog.Title className={`${styles.title} ${styles[className]}`}>
            {title}
          </Dialog.Title>
          {children}
          {isClose && (
            <Dialog.Close asChild>
              <button className={styles.iconButton} aria-label="Close">
                <Image src={close} alt="" />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
