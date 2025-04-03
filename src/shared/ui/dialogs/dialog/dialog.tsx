import { ComponentPropsWithoutRef, ReactNode } from "react";
import { DialogContent } from "@/shared/ui/dialogs/dialog/dialogContent/dialogContent";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogCloseIcon } from "@/shared/ui/dialogs/dialogCloseIcon/dialogCloseIcon";

type Props = {
  children?: ReactNode;
  closePosition?: "inside" | "none" | "outside";
  dialogContentProps?: ComponentPropsWithoutRef<typeof DialogContent>;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export const Dialog = ({
  children,
  closePosition,
  dialogContentProps,
  trigger,
  ...props
}: Props) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogContent {...dialogContentProps}>
        <DialogCloseIcon closePosition={closePosition} />
        {children}
      </DialogContent>
    </DialogPrimitive.Root>
  );
};
