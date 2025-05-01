import styles from "./carouselNext.module.css";
import SvgArrowIosForwardOutline from "@/assets/icons/components/ArrowIosForwardOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import * as React from "react";
import { useCarousel } from "@/shared/ui/carousel/carousel";
import { cn } from "@/shared/utils/cn";

type CarouselNextProps = React.ComponentProps<typeof IconButton>;

export const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, ...props }, ref) => {
    const { canScrollNext, scrollNext } = useCarousel();

    return (
      <IconButton
        className={cn(styles.iconButton, className)}
        disabled={!canScrollNext}
        onClick={scrollNext}
        ref={ref}
        {...props}
      >
        <SvgArrowIosForwardOutline className={styles.iconSize} />
        <span className={styles.srOnly}>Next slide</span>
      </IconButton>
    );
  }
);

CarouselNext.displayName = "CarouselNext";
