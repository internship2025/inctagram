import Image from "next/image";
import { Carousel } from "@/shared/ui/carousel/carousel";
import { CarouselContent } from "@/shared/ui/carousel/carouselContent/carouselContent";
import { CarouselItem } from "@/shared/ui/carousel/carouselItem/carouselItem";
import styles from "./imageCarousel.module.css";
import { CarouselPrevious } from "@/shared/ui/carousel/carouselPrevious/carouselPrevious";
import { CarouselNext } from "@/shared/ui/carousel/carouselNext/carouselNext";

type Props = {
  images: string[];
  onClick?: () => void;
  selectedIndexCallBack?: (index: number) => void;
};

export const ImageCarousel = ({
  images,
  onClick,
  selectedIndexCallBack,
}: Props) => {
  return (
    <Carousel
      opts={{ loop: true }}
      selectedIndexCallBack={selectedIndexCallBack}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              src={image}
              alt={`img ${index}`}
              className={styles.carouselItemImage}
              height={400}
              width={400}
              priority
              onClick={onClick}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      {/*CAROUSEL DOTS*/}
    </Carousel>
  );
};
