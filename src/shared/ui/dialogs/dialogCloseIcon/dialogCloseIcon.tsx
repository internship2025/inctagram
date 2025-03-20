import { ComponentPropsWithoutRef, forwardRef } from "react";
import { SvgCloseOutline } from "@/assets/icons/components/CloseOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { cn } from "@/shared/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./DialogCloseIcon.module.css";

interface DialogCloseIconProps
  extends Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, "ref"> {
  closePosition?: "inside" | "none" | "outside"; // Добавляем тип для closePosition
  className?: string;
}

const DefaultCloseButton = () => {
  return (
    <IconButton
      aria-label={"Close"}
      className={cn(styles.closeButton, styles.closeButtonHover)}
    >
      <SvgCloseOutline />
    </IconButton>
  );
};

export const DialogCloseIcon = forwardRef<
  HTMLButtonElement, // Здесь мы указываем тип для ref, заменяя ElementRef
  DialogCloseIconProps
>(
  (
    {
      asChild = true,
      children = DefaultCloseButton(),
      className,
      closePosition,
      ...props
    },
    ref,
  ) => {
    let positionClass = "";
    switch (closePosition) {
      case "inside":
        positionClass = styles.closePositionInside;
        break;
      case "none":
        positionClass = styles.closePositionNone;
        break;
      case "outside":
        positionClass = styles.closePositionOutside;
        break;
    }

    return (
      <DialogPrimitive.Close
        asChild={asChild}
        className={cn(styles.closeButton, positionClass, className)}
        ref={ref}
        {...props}
      >
        {children}
      </DialogPrimitive.Close>
    );
  },
);

DialogCloseIcon.displayName = "DialogCloseIcon";
