import {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactNode,
  forwardRef,
} from "react";

import { SvgCloseOutline } from "@/assets/icons/components/CloseOutline";
import { Button } from "@/shared/ui/button/button";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { AlertDialogProps as AlertDialogRootProps } from "@radix-ui/react-alert-dialog";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { Typography } from "@/shared/ui/typography/typography";

import styles from "./alertDialog.module.css";

type AlertDialogProps = {
  cancelButton?: ReactNode;
  checkbox?: ReactNode;
  confirmButton?: ReactNode;
  defaultOpen?: AlertDialogRootProps["defaultOpen"];
  description?: string;
  onOpenChange?: AlertDialogRootProps["onOpenChange"];
  open?: AlertDialogRootProps["open"];
  position?: "bottomLeft" | "bottomRight" | "center" | "topLeft" | "topRight";
  title?: string;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>;

type ButtonComponentProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const AlertDialog = forwardRef<
  ComponentRef<typeof RadixAlertDialog.Content>,
  AlertDialogProps
>((props, ref) => {
  const {
    cancelButton,
    checkbox,
    confirmButton,
    defaultOpen,
    description,
    onOpenChange,
    open,
    position = "center",
    title,
    trigger,
    ...rest
  } = props;

  return (
    <RadixAlertDialog.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
    >
      <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className={styles.overlay} />
        <RadixAlertDialog.Content
          className={`${styles.root} ${styles[position]}`}
          {...rest}
          ref={ref}
        >
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <RadixAlertDialog.Title>
                <Typography>{title}</Typography>
              </RadixAlertDialog.Title>
              <RadixAlertDialog.Cancel asChild>
                <IconButton className={styles.closeButton}>
                  <SvgCloseOutline />
                </IconButton>
              </RadixAlertDialog.Cancel>
            </div>
          </div>
          <RadixAlertDialog.Description className={styles.description}>
            <Typography className={styles.descriptionText}>
              {description}
            </Typography>
          </RadixAlertDialog.Description>
          <div className={styles.footer}>
            <div className={styles.checkboxContainer}>{checkbox}</div>
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
});

AlertDialog.displayName = 'AlertDialog';

const CancelButton = ({ className, ...props }: ButtonComponentProps) => {
  return (
    <Button
      className={`${styles.button} ${className || ""}`}
      variant={"primary"}
      {...props}
    />
  );
};

const ConfirmButton = ({ className, ...props }: ButtonComponentProps) => {
  return (
    <Button
      className={`${styles.button} ${className || ""}`}
      variant={"outline"}
      {...props}
    />
  );
};

export { AlertDialog, type AlertDialogProps, CancelButton, ConfirmButton };
