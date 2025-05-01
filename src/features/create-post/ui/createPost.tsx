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
import { PublishContent } from "@/features/create-post/ui/publishContent/publishContent";
import { AlertDialog } from "@/shared/ui/alertDialog/alertDialog";

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
    fileInputRef.current.click();
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
        {stage === CreatePostStages.Cropping && (
          <CroppingContent
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            setPhotoToUpload={setPhotoToUpload}
            setStage={setStage}
          />
        )}
        {/*{stage === CreatePostStages.Filtering && <FilteringDialogContent setStage={setStage} />}*/}
        {stage === CreatePostStages.Publish && (
          <PublishContent
            onPostPublished={() => {
              setStage(CreatePostStages.AddFiles);
              onPostPublished();
            }}
            setStage={setStage}
          />
        )}
      </Dialog>

      <AlertDialog
        open={openAlertModal}
        onOpenChange={setOpenAlertModal}
        title="Discard changes?"
        description="Are you sure you want to discard your changes? This action cannot be undone."
        confirmButton={
          <button
            onClick={() => {
              setOpenAlertModal(false);
              onOpenChange?.(false);
              dispatch(createPostSliceActions.moveImagesToDraft());
            }}
          >
            Discard
          </button>
        }
        cancelButton={
          <button onClick={() => setOpenAlertModal(false)}>Cancel</button>
        }
      />
    </>
  );
};
