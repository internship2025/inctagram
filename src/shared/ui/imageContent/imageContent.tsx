import Image from "next/image";
import styles from "./imageContent.module.css";
import imageDefault from "@/assets/icons/png/imageDefault.png";
import { ImageCarousel } from "@/shared/ui/carousel/imageCarousel/imageCarousel";

type Props = {
  itemImages: string[];
  onClick?: () => void;
  selectedIndexCallBack?: (index: number) => void;
};

export const ImageContent = ({
  itemImages,
  onClick,
  selectedIndexCallBack,
}: Props) => {
  if (itemImages.length === 0) {
    return (
      <Image
        className={styles.image}
        src={imageDefault}
        alt={"Post image"}
        priority
      />
    );
  } else if (itemImages.length === 1) {
    // Показываем одно изображение, если 1 картинка
    return (
      <Image
        className={styles.image}
        src={itemImages[0] ?? imageDefault} // Показываем выбранное изображение
        alt={"Post image"}
        height={400}
        width={400}
        priority
      />
    );
  } else {
    // Показываем карусель
    return (
      <ImageCarousel
        images={itemImages}
        onClick={onClick}
        selectedIndexCallBack={selectedIndexCallBack}
      />
    );
  }
};
