"use client";

import styles from "./addAvatarSection.module.css";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { useGetProfileQuery } from "@/features/home-page/ui/user-profile/api/userProfile.api";
import { useEffect, useState } from "react";
import { SvgCloseOutline } from "@/assets/icons/components/CloseOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { Button } from "@/shared/ui/button/button";
import { AddProfilePhotoDialog } from "@/features/profile-settings/ui/general-information/addAvatarSection/addProfilePhotoDialog";

export const AddAvatarSection = () => {
  const { data: profileData } = useGetProfileQuery();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handlePhotoUploaded = (file: File) => {
    setPhotoToUpload(file);
  };

  useEffect(() => {
    if (profileData?.avatars?.[0]?.url) {
      setAvatarSrc(profileData.avatars[0].url);
    }

    return () => {
      if (avatarSrc && avatarSrc.startsWith("blob:")) {
        URL.revokeObjectURL(avatarSrc);
      }
    };
  }, [profileData, avatarSrc]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.avatarSection}>
        <Avatar
          alt={"avatar"}
          className={styles.avatar}
          width={300}
          src={avatarSrc}
        />
        {avatarSrc && (
          <div className={styles.closeOutline}>
            <IconButton className={styles.iconButton}>
              <SvgCloseOutline />
            </IconButton>
          </div>
        )}
      </div>
      <AddProfilePhotoDialog
        open={open}
        onPhotoUploaded={handlePhotoUploaded}
        onOpenChange={setOpen}
        // onSendPhoto={handleSendPhoto}
      />
      <Button
        className={styles.avatarButton}
        variant={"outline"}
        onClick={() => setOpen(true)}
      >
        {!avatarSrc ? "Add a Profile Photo" : "Update a Profile Photo"}
      </Button>
    </div>
  );
};
