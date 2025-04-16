"use client";

import styles from "./addProfilePhotoDialog.module.css";
import { Dialog } from "@/shared/ui/dialogs/dialog/dialog";
import { Typography } from "@/shared/ui/typography/typography";
import { useRef, useState } from "react";
import { ImageUploader } from "@/shared/ui/imageUploader/imageUploader";
import { SvgImageOutline } from "@/assets/icons/components/ImageOutline";

type Props = {};

export const AddProfilePhotoDialog = ({}: Props) => {
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.mainDialog}>
      <Dialog>
        <Typography className={styles.photoText}>
          {"Add a Profile Photo"}
        </Typography>

        {!photoToUpload && (
          <div className={styles.uploadContainer}>
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
          </div>
        )}
      </Dialog>
    </div>
  );
};
