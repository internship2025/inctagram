import styles from "./carouselNext.module.css";
import SvgArrowIosBackOutline from "@/assets/icons/components/ArrowIosBackOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import * as React from "react";
import { useCarousel } from "@/shared/ui/carousel/carousel";
import { cn } from "@/shared/utils/cn";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof IconButton>
>(({ className, ...props }, ref) => {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <IconButton
      className={cn(
        styles.iconButton,
        orientation === "horizontal"
          ? styles.iconButtonHorisontal
          : styles.iconButtonVertical,
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      ref={ref}
      {...props}
    >
      <SvgArrowIosBackOutline className={styles.iconSize} />
      <span className={styles.srOnly}>Next slide</span>
    </IconButton>
  );
});

CarouselNext.displayName = "CarouselNext";
