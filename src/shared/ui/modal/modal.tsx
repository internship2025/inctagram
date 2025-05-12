"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./modal.module.css";
import Image from "next/image";
import close from "@/features/auth/ui/assets/close.svg";

type Modal = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  marginTop?: number;
  textAlign?: "left" | "right" | "center";
  open?: boolean;
  onClose?: () => void;
  isClose?: boolean;
  portalContainer?: HTMLDivElement | null;
  closeOnlyOnButton?: boolean;
};

export const Modal = ({
  children,
  className = "",
  title,
  open = true,
  onClose,
  isClose = false,
  portalContainer,
  closeOnlyOnButton = false,
}: Modal) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
         onInteractOutside={(e) => {
            if (closeOnlyOnButton) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (closeOnlyOnButton) e.preventDefault(); 
          }}
          aria-describedby={undefined}
          className={`${styles.commonStyles} ${className}`}
        >
          <div className={styles.header}>
            <Dialog.Title className={`${styles.title} ${styles[className]}`}>
              {title}
            </Dialog.Title>
            {isClose && (
              <Dialog.Close asChild>
                <button className={styles.iconButton} aria-label="Close">
                  <Image src={close} alt="" />
                </button>
              </Dialog.Close>
            )}
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
