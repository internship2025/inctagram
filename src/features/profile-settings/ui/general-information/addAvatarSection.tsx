"use client";

import styles from "./addAvatarSection.module.css";
import {
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
  useUploadProfileAvatarMutation,
} from "@/features/home-page/ui/user-profile/api/userProfile.api";
import { useEffect, useState } from "react";
import { UploadProfileAvatarResponse } from "@/features/home-page/ui/user-profile/api/types";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { SvgCloseOutline } from "@/assets/icons/components/CloseOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { Spinner } from "@radix-ui/themes";

export const AddAvatarSection = ({ avatars }: UploadProfileAvatarResponse) => {
  const { data: profileData } = useGetProfileQuery();

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const [uploadProfileAvatar, { isLoading: isUploading }] =
    useUploadProfileAvatarMutation();

  const [deleteProfileAvatar, { isLoading: isDeleting }] =
    useDeleteProfileAvatarMutation();

  useEffect(() => {
    if (avatars?.[0]) {
      setAvatarSrc(avatars[0].url);
    }

    // Cleanup function to revoke the object URL when avatarSrc changes or component unmounts
    return () => {
      if (avatarSrc && avatarSrc.startsWith("blob:")) {
        URL.revokeObjectURL(avatarSrc);
      }
    };
  }, [profileData, avatars, avatarSrc]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsAvatarLoading(true);
      try {
        await uploadProfileAvatar({ file }).unwrap();
      } catch (error) {
        console.error("Failed to upload avatar:", error);
      } finally {
        setIsAvatarLoading(false);
      }
    }
  };

  const handleDeleteAvatar = async () => {
    setIsAvatarLoading(true);
    try {
      await deleteProfileAvatar().unwrap();
      setAvatarSrc(undefined);
    } catch (error) {
      console.error("Failed to delete avatar:", error);
    } finally {
      setIsAvatarLoading(false);
    }
  };

  if (isDeleting || isUploading || isAvatarLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.avatarSection}>
        <Avatar alt={"User avatar"} src={avatarSrc} />
        {avatarSrc && (
          <div className={styles.closeButtonContainer}>
            <IconButton onClick={handleDeleteAvatar}>
              <SvgCloseOutline />
            </IconButton>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hidden}
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className={styles.uploadButton}>
          {avatarSrc ? "Change avatar" : "Add avatar"}
        </label>
      </div>
    </div>
  );
};
