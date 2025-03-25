import { ComponentPropsWithoutRef, RefObject, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from "@/features/create-post/utils/createPostSlice";
import { Dialog } from "@/shared/ui/dialogs/dialog/dialog";
import { AddFilesContent } from "@/features/create-post/ui/addFilesContent/addFilesContent";
import { CroppingContent } from "@/features/create-post/ui/croppingContent/croppingContent";

type Props = {
  onPostPublished: () => void;
} & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export enum CreatePostStages {
  AddFiles = 1,
  Cropping = 2,
  Filtering = 3,
  Publish = 4,
}

export const CreatePost = ({
  onPostPublished,
  onOpenChange,
  ...props
}: Props) => {
  const images = useAppSelector(createPostSliceSelectors.selectImages);

  const [stage, setStage] = useState<CreatePostStages>(
    CreatePostStages.AddFiles,
  );

  const [openAlertModal, setOpenAlertModal] = useState(false);

  const dispatch = useAppDispatch();

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);

  if (photoToUpload) {
    const newImage = URL.createObjectURL(photoToUpload); //создание временного URl изображения, которое потом диспатчим в state

    dispatch(createPostSliceActions.addImage({ image: newImage }));
    setPhotoToUpload(null);
    setStage(CreatePostStages.Cropping);
  }

  const handleOpenDraft = () => {
    setStage(CreatePostStages.Cropping);
    dispatch(createPostSliceActions.getImagesFromDraft());
  };

  const fileInputRef = useRef<HTMLInputElement>(
    null!,
  ) as RefObject<HTMLInputElement>;

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Dialog
        {...props}
        closePosition={stage === CreatePostStages.AddFiles ? "inside" : "none"}
        onOpenChange={(open) => {
          if (onOpenChange) {
            if (!open && images.length > 0) {
              setOpenAlertModal(true);
            } else {
              onOpenChange(open);
            }
          }
        }}
      >
        {stage === CreatePostStages.AddFiles && (
          <AddFilesContent
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            handleOpenDraft={handleOpenDraft}
            setPhotoToUpload={setPhotoToUpload}
          />
        )}
        {stage === CreatePostStages.Cropping && <CroppingContent />}
      </Dialog>
    </>
  );
};
