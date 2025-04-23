"use client";

import styles from "./addProfilePhotoDialog.module.css";
import { Dialog } from "@/shared/ui/dialogs/dialog/dialog";
import { useRef, useState } from "react";
import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";
import { AvatarUploader } from "@/shared/ui/avatarUploader/avatarUploader";

type Props = {
  open?: boolean;
};

export const AddProfilePhotoDialog = ({ open }: Props) => {
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.mainContainer}>
      <Dialog open={open} onOpenChange={}>
        <Typography>Add a Profile Photo</Typography>
        {!photoToUpload && (
          <div className={styles.uploaderContainer}>
            <AvatarUploader setPhotoToUpload={} fileInputRef={fileInputRef} />
            <Button onClick={handleFileSelect}>Select from Computer</Button>
          </div>
        )}
      </Dialog>
    </div>
  );
};
