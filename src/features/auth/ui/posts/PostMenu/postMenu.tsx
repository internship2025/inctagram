import { useState } from "react";
import { Modal } from "@/shared/ui/modal/modal";
import { Typography } from "@/shared/ui/typography/typography";
import { ConfirmModal } from "@/shared/ui/confirmModal/confirmModal";
import { Popover } from "radix-ui";
import Image from "next/image";
import s from "./postMenu.module.css";
import { Button } from "@/shared/ui/button/button";
import { PostEdit } from "@/features/auth/ui/posts/PostEdit/postEdit";
import { useDeletePostMutation } from "@/features/create-post/api/post.api";

type Props = {
  postId: number;
  postDescription: string;
  postImg: string;
  onPostDeleted: () => void;
  onPostUpdated: () => void;
};

export const PostMenu = ({
  postId,
  postDescription,
  postImg,
  onPostDeleted,
  onPostUpdated,
}: Props) => {
  const [deletePost] = useDeletePostMutation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      onPostDeleted();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    onPostUpdated();
  };

  const handleCloseEditModal = () => {
    if (hasUnsavedChanges) {
      setIsConfirmModalOpen(true);
    } else {
      setIsEditModalOpen(false);
    }
  };

  const handleConfirmClose = () => {
    setIsEditModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className={s.container}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <div>
            <Image
              src="/edit.svg"
              alt="Edit Image"
              width={24}
              height={24}
              className={s.icon}
            />
          </div>
        </Popover.Trigger>

        <Popover.Content className={s.Content} sideOffset={5}>
          <Button
            variant="text"
            onClick={handleEditClick}
            className={s.popoverButton}
          >
            <Image src="/pensil.svg" alt="Edit Image" width={24} height={24} />
            <Typography variant="span">Edit Post</Typography>
          </Button>

          <Button
            variant="text"
            onClick={() => setIsConfirmModalOpen(true)}
            className={s.popoverButton}
          >
            <Image src="/trash.svg" alt="delete" width={24} height={24} />
            <Typography variant="span">Delete Post</Typography>
          </Button>
        </Popover.Content>
      </Popover.Root>

      <Modal
        className={s.modalPostEdit}
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Post"
      >
        <PostEdit
          postId={postId}
          postDescription={postDescription}
          postImg={postImg}
          onCancel={() => handleCloseEditModal()}
          onSuccess={handleEditSuccess}
          onChangesDetected={setHasUnsavedChanges}
        />
      </Modal>

      <ConfirmModal
        open={isConfirmModalOpen && !hasUnsavedChanges}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <Typography variant="p">
          Are you sure you want to delete this post?
        </Typography>
      </ConfirmModal>

      <ConfirmModal
        open={isConfirmModalOpen && hasUnsavedChanges}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmClose}
        title="Unsaved Changes"
        confirmText="Discard"
        cancelText="Cancel"
      >
        <Typography variant="p">
          You have unsaved changes. Are you sure you want to discard them?
        </Typography>
      </ConfirmModal>
    </div>
  );
};
