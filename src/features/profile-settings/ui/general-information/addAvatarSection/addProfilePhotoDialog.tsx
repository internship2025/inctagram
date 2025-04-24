import styles from "./addProfilePhotoDialog.module.css";
import { Dialog } from "@/shared/ui/dialogs/dialog/dialog";
import { useRef, useState, RefObject } from "react";
import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";
import { AvatarUploader } from "@/shared/ui/avatarUploader/avatarUploader";
import Image from "next/image";

type Props = {
  open?: boolean;
  onPhotoUploaded: (file: File) => void;
  onOpenChange: (open: boolean) => void;
};

export const AddProfilePhotoDialog = ({
  open,
  onPhotoUploaded,
  onOpenChange,
}: Props) => {
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onCloseAddProfilePhoto = () => {
    onOpenChange(false);
    setPhotoToUpload(null);
    setPreviewSrc(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (file: File) => {
    setPhotoToUpload(file);
    setPreviewSrc(URL.createObjectURL(file));
    onPhotoUploaded(file);
  };

  return (
    <div className={styles.mainContainer}>
      <Dialog
        open={open}
        onOpenChange={onCloseAddProfilePhoto}
        dialogContentProps={{ className: styles.dialogContent }}
      >
        <div className={styles.addPhoto}>
          <Typography className={styles.photoText}>{"Add photo"}</Typography>
        </div>
        {!photoToUpload && (
          <div className={styles.uploaderContainer}>
            <AvatarUploader
              setPhotoToUpload={handleFileChange}
              fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
            />
            <Button onClick={handleFileSelect}>Select from Computer</Button>
          </div>
        )}

        {previewSrc && (
          <div className={styles.previewContainer}>
            <Image
              className={styles.previewImage}
              src={previewSrc}
              alt={"avatar"}
              height={340}
              width={332}
            />
            <Image
              className={styles.previewRoundedImage}
              src={previewSrc}
              alt={"rounded avatar"}
              height={340}
              width={332}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
};
