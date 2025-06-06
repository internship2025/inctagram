import styles from "./carouselPrevious.module.css";
import SvgArrowIosBackOutline from "@/assets/icons/components/ArrowIosBackOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import * as React from "react";
import { useCarousel } from "@/shared/ui/carousel/carousel";
import { cn } from "@/shared/utils/cn";

type CarouselPreviousProps = React.ComponentProps<typeof IconButton>;

export const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, ...props }, ref) => {
    const { canScrollPrev, scrollPrev } = useCarousel();

    return (
      <IconButton
        className={cn(styles.iconButton, className)}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        ref={ref}
        {...props}
      >
        <SvgArrowIosBackOutline className={styles.iconSize} />
        <span className={styles.srOnly}>Previous slide</span>
      </IconButton>
    );
  }
);

CarouselPrevious.displayName = "CarouselPrevious";
