import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { ComponentRef } from "react";
import styles from "./alertDialog.module.css";

type AlertDialogProps = {
  title?: string;
  description?: string;
  confirmButton?: ReactNode;
  cancelButton?: ReactNode;
  trigger?: ReactNode;
  checkbox?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>;

const AlertDialog = forwardRef<
  ComponentRef<typeof RadixAlertDialog.Content>,
  AlertDialogProps
>(
  (
    {
      title,
      description,
      confirmButton,
      cancelButton,
      trigger,
      checkbox,
      ...rest
    },
    ref,
  ) => {
    return (
      <RadixAlertDialog.Root>
        <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
        <RadixAlertDialog.Portal>
          <RadixAlertDialog.Overlay className={styles.overlay} />
          <RadixAlertDialog.Content
            ref={ref}
            className={styles.content}
            {...rest}
          >
            {title && (
              <RadixAlertDialog.Title className={styles.title}>
                {title}
              </RadixAlertDialog.Title>
            )}
            {description && (
              <RadixAlertDialog.Description className={styles.description}>
                {description}
              </RadixAlertDialog.Description>
            )}
            {checkbox && <div className={styles.checkbox}>{checkbox}</div>}
            <div className={styles.buttons}>
              <RadixAlertDialog.Action asChild>
                {confirmButton}
              </RadixAlertDialog.Action>
              <RadixAlertDialog.Cancel asChild>
                {cancelButton}
              </RadixAlertDialog.Cancel>
            </div>
          </RadixAlertDialog.Content>
        </RadixAlertDialog.Portal>
      </RadixAlertDialog.Root>
    );
  },
);

AlertDialog.displayName = "AlertDialog";
export { AlertDialog };
