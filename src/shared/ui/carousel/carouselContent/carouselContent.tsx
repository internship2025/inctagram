import { cn } from "@/shared/utils/cn";
import * as React from "react";
import { useCarousel } from "@/shared/ui/carousel/carousel";
import styles from "./carouselContent.module.css";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className={styles.carouselContentContainer} ref={carouselRef}>
      <div
        className={cn(
          styles.container,
          orientation === "horizontal" ? styles.horizontal : styles.vertical,
          className,
        )}
        ref={ref}
        {...props}
      ></div>
    </div>
  );
});

CarouselContent.displayName = 'CarouselContent';
