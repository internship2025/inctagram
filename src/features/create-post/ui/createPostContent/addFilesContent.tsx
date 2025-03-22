import { Typography } from "@/shared/ui/typography/typography";
import { RefObject, useState } from "react";
import { useAppSelector } from "@/services/store";
import { createPostSliceSelectors } from "@/features/create-post/utils/createPostSlice";
import styles from "./addFilesContent.module.css";
import { ImageUploader } from "@/shared/ui/imageUploader/imageUploader";

type Props = {
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelect: () => void;
  handleOpenDraft: (file: File) => void;
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
    <div>
      <div>
        <Typography>{"Add Photo"}</Typography>
      </div>
      <div className={styles.bodyContainer}>
        <ImageUploader
          fileInputRef={fileInputRef}
          setError={setError}
          setPhotoUpload={setPhotoToUpload}
        ></ImageUploader>
      </div>
    </div>
  );
};
