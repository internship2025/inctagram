import Image from "next/image";
import styles from "/imageContent.module.css";
import imageDefault from "@/assets/icons/png/imageDefault.png";

type Props = { itemImages: string[] };

export const ImageContent = ({ itemImages }: Props) => {
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
    return (
      <Image
        className={styles.image}
        src={itemImages[0] ?? imageDefault}
        alt={"Post image"}
        height={400}
        width={400}
        priority
      />
    );
  } else {
    return (

    )
  }
};
