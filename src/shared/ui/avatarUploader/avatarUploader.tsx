import styles from "./avatarUploader.module.css";
import { ChangeEvent, RefObject, useState } from "react";
import { Typography } from "@/shared/ui/typography/typography";
import { SvgImageOutline } from "@/assets/icons/components/ImageOutline";

type ImageUploaderProps = {
  fileInputRef: RefObject<HTMLInputElement>;
  setPhotoToUpload: (file: File) => void;
};

export const AvatarUploader = ({
  fileInputRef,
  setPhotoToUpload,
}: ImageUploaderProps) => {
  const [error, setError] = useState("");

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const validFormats = ["image/jpeg", "image/png"];
    const maxSizeInB = 10000000;

    if (e.currentTarget.files) {
      if (e.currentTarget.files[0].size < maxSizeInB) {
        if (validFormats.includes(e.currentTarget.files[0].type)) {
          setPhotoToUpload(e.currentTarget.files[0]);
        } else {
          setError("The photo must have JPEG or PNG format");
        }
      } else {
        setError("The photo must be less than 10 Mb");
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.avatarUploaderContainer}>
      <input
        accept={".jpg, .jpeg, .png"}
        className={styles.hidden}
        onChange={onFileSelected}
        ref={fileInputRef}
        type={"file"}
      />
      {error && (
        <div className={styles.error}>
          <Typography>{error}</Typography>
        </div>
      )}
      <div className={styles.imageOutline}>
        <SvgImageOutline height={46} width={46} />
      </div>
    </div>
  );
};
