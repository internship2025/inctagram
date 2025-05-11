import * as React from "react";
import { cn } from "@/shared/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./dialogContent.module.css";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className={cn(styles.overlay)} />
    <DialogPrimitive.Content
      className={cn(styles.dialogContent, className)}
      ref={ref}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));

DialogContent.displayName = "DialogContent";
