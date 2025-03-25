import styles from "@/features/create-post/ui/croppingContent/croppingContent.module.css";
import { useState } from "react";
import { ImageContent } from "@/shared/ui/imageContent/imageContent";
import { useAppDispatch, useAppSelector } from "@/services/store";
import { createPostSliceSelectors } from "@/features/create-post/utils/createPostSlice";

type Props = {};

export const CroppingContent = () => {
  const dispatch = useAppDispatch();
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages);

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.mainContainer}>
      <div></div>
      <div className={styles.bodyContainer}>
        <div className={styles.contentContainer}>
          {!edit && (
            <ImageContent
              itemImages={imagesState}
              selectedIndexCallBack={setCurrentImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
