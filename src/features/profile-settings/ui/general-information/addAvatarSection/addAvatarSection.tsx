"use client";

import styles from "./addAvatarSection.module.css";
import { Avatar } from "@/shared/ui/avatar/avatar";
import {
  useDeleteProfileAvatarMutation,
  useGetProfileQuery,
  useUploadProfileAvatarMutation,
} from "@/features/home-page/ui/user-profile/api/userProfile.api";
import { useEffect, useState } from "react";
import { SvgCloseOutline } from "@/assets/icons/components/CloseOutline";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { Button } from "@/shared/ui/button/button";
import { AddProfilePhotoDialog } from "@/features/profile-settings/ui/general-information/addAvatarSection/addProfilePhotoDialog";
import { toast } from "react-toastify";
import { Spinner } from "@radix-ui/themes";
import {
  AlertDialog,
  CancelButton,
  ConfirmButton,
} from "@/shared/ui/alertDialog/alertDialog";

export const AddAvatarSection = () => {
  const { data: profileData } = useGetProfileQuery();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [uploadProfileAvatar, { isLoading: isUploading }] =
    useUploadProfileAvatarMutation();
  const [deleteProfileAvatar, { isLoading: isDeleting }] =
    useDeleteProfileAvatarMutation();

  const handlePhotoUploaded = (file: File) => {
    setPhotoToUpload(file);
  };

  useEffect(() => {
    if (profileData?.avatars?.[0]?.url) {
      setAvatarSrc(profileData.avatars[0].url);
    } else {
      setAvatarSrc(undefined);
    }
    setIsAvatarLoading(false);
  }, [profileData]);

  const handleSendPhoto = async () => {
    if (photoToUpload) {
      setOpen(false);
      setIsAvatarLoading(true);
      try {
        await uploadProfileAvatar({ file: photoToUpload }).unwrap();
        setPhotoToUpload(null);
      } catch (error) {
        console.error("Failed to upload avatar:", error);
        toast.error("Failed to upload avatar");
        setIsAvatarLoading(false);
      }
    }
  };

  const handleDeletePhoto = async () => {
    setIsAvatarLoading(true);
    try {
      await deleteProfileAvatar().unwrap();
      setPhotoToUpload(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete avatar:", error);
      toast.error("Failed to delete avatar");
      setIsAvatarLoading(false);
    }
  };

  if (isDeleting || isUploading || !profileData) {
    return (
      <div className={styles.spinner}>
        <div><Spinner/></div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.avatarSection}>
          <Avatar
            alt={"avatar"}
            className={styles.avatar}
            width={300}
            src={avatarSrc}
          />
          {avatarSrc && !isAvatarLoading && (
            <div className={styles.closeOutline}>
              <IconButton
                className={styles.iconButton}
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <SvgCloseOutline />
              </IconButton>
            </div>
          )}
        </div>
        <AddProfilePhotoDialog
          open={open}
          onPhotoUploaded={handlePhotoUploaded}
          onOpenChange={setOpen}
          onSendPhoto={handleSendPhoto}
        />
        <Button
          className={styles.avatarButton}
          variant={"outline"}
          onClick={() => setOpen(true)}
        >
          {!avatarSrc ? "Add a Profile Photo" : "Update a Profile Photo"}
        </Button>
      </div>
      <AlertDialog
        cancelButton={
          <CancelButton onClick={() => setIsDeleteDialogOpen(false)}>
            No
          </CancelButton>
        }
        confirmButton={
          <ConfirmButton onClick={handleDeletePhoto}>Yes</ConfirmButton>
        }
        description={"Are you sure you want to delete the photo?"}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        title={"Delete Photo"}
      />
    </>
  );
};
