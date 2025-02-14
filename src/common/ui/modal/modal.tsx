import * as React from "react";

import * as Dialog from "@radix-ui/react-dialog";

import styles from "./modal.module.css";
import Image from "next/image";

type Modal = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  icons?: Array<{src: string, width: number, height: number}> | [];
  open: boolean;
  onOpenChange: () => void;
};

export const Modal = ({
  children,
  className = "signUp",
  title,
  icons = [],
  open,
  onOpenChange,
}: Modal) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className={styles.Overlay} />
      <Dialog.Content className={styles[className]}>
        <Dialog.Title className={styles.title}>{title}</Dialog.Title>

        {icons.length ? (
          <div className={styles.wrapperIcons}>
            {icons.map((it, ind) => {
              return <Image className={styles.images} key = {ind} src={it.src} width={it.width} height={it.height} alt="" />;
            })}
          </div>
        ) : (
          ""
        )}

		{children}
     
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);


   {/* <Dialog.Close asChild>
          <button className={`${styles.Button} green`}>Save changes</button>
        </Dialog.Close>

        <Dialog.Close asChild>
          <button className={styles.IconButton} aria-label="Close"></button>
        </Dialog.Close> */}