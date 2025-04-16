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
import { AddFilesContent } from "@/features/create-post/ui/addFilesContent/addFilesContent";

export const AddAvatarSection = ({ avatars }: UploadProfileAvatarResponse) => {
  const { data: profileData } = useGetProfileQuery();

  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);

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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.avatarSection}>
        <Avatar alt={"User avatar"} src={avatarSrc} />
        <div className={styles.closeButtonContainer}>
          <SvgCloseOutline />
        </div>
      </div>
    </div>
  );
};
