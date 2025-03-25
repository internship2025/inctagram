import { cn } from "@/shared/utils/cn";
import * as React from "react";
import { useCarousel } from "@/shared/ui/carousel/carousel";
import styles from "./carouselItem.module.css";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      aria-roledescription={"slide"}
      className={cn(
        styles.item,
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        className,
      )}
      ref={ref}
      role={"group"}
      {...props}
    />
  );
});

CarouselItem.displayName = "CarouselItem";
