import styles from "@/features/create-post/ui/croppingContent/croppingContent.module.css";
import { useState } from "react";
import { ImageContent } from "@/shared/ui/imageContent/imageContent";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from "@/features/create-post/utils/createPostSlice";
import { CreatePostHeader } from "@/features/create-post/ui/croppingContent/createPostHeader/createPostHeader";
import { CreatePostStages } from "@/features/create-post/ui/createPost";
import Cropper, { Area } from "react-easy-crop";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { getCroppedImage } from "@/features/create-post/utils/getCroppedImage";
import SvgEdit2 from "@/assets/icons/components/Edit2";
import SvgEdit2Outline from "@/assets/icons/components/Edit2Outline";

type Props = {
  setStage: (stage: CreatePostStages) => void;
};

export const CroppingContent = ({ setStage }: Props) => {
  const dispatch = useAppDispatch();
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages);

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [edit, setEdit] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onSetEdit = async () => {
    if (edit && croppedAreaPixels) {
      const link = await getCroppedImage(
        imagesState[currentImage],
        croppedAreaPixels,
      );

      dispatch(
        createPostSliceActions.setImage({ image: link, index: currentImage }),
      );
    }
    setEdit(!edit);
  };

  return (
    <div className={styles.mainContainer}>
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.AddFiles)}
        title={"Cropping"}
        handleNext={() => setStage(CreatePostStages.Filtering)}
      />
      <div className={styles.bodyContainer}>
        <div className={styles.contentContainer}>
          {!edit && (
            <ImageContent
              itemImages={imagesState}
              selectedIndexCallBack={setCurrentImage}
            />
          )}
          {edit && <Cropper crop={crop} onCropChange={setCrop} />}
          <div className={styles.iconContainer}>
            <IconButton className={styles.iconEditButton} onClick={onSetEdit}>
              {edit ? <SvgEdit2 /> : <SvgEdit2Outline />}
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
