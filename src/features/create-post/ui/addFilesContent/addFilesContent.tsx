import { Typography } from "@/shared/ui/typography/typography";
import { RefObject, useState } from "react";
import { useAppSelector } from "@/services/store";
import { createPostSliceSelectors } from "@/features/create-post/utils/createPostSlice";
import styles from "./addFilesContent.module.css";
import { ImageUploader } from "@/shared/ui/imageUploader/imageUploader";
import { SvgImageOutline } from "@/assets/icons/components/ImageOutline";
import { Button } from "@/shared/ui/button/button";

type Props = {
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelect: () => void;
  handleOpenDraft: () => void;
  setPhotoToUpload: (file: File) => void;
};

export const AddFilesContent = ({
  fileInputRef,
  handleFileSelect,
  handleOpenDraft,
  setPhotoToUpload,
}: Props) => {
  const [error, setError] = useState("");

  const draftImages = useAppSelector(
    createPostSliceSelectors.selectDraftImages,
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.addPhoto}>
        <Typography className={styles.photoText}>{"Add photo"}</Typography>
      </div>
      <div className={styles.bodyContainer}>
        <ImageUploader
          fileInputRef={fileInputRef}
          setError={setError}
          setPhotoUpload={setPhotoToUpload}
        >
          <div className={styles.upLoaderContainer}>
            {error && (
              <div className={styles.errorContainer}>
                <Typography>{error}</Typography>
              </div>
            )}
            <div className={styles.imageOutline}>
              <SvgImageOutline height={46} width={46} />
            </div>
          </div>
        </ImageUploader>
        <div className={styles.butttonContainers}>
          <Button
            className={styles.selectButton}
            onClick={handleFileSelect}
            variant={"primary"}
          >
            Select from computer
          </Button>
          <Button
            className={styles.openDraftButton}
            disabled={draftImages.length === 0}
            onClick={handleOpenDraft}
            variant={"outline"}
          >
            Open draft
          </Button>
        </div>
      </div>
    </div>
  );
};
