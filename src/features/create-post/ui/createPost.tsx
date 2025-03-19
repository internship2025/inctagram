import { ComponentPropsWithoutRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from "@/features/create-post/utils/createPostSlice";
import { Modal } from "@/shared/ui/modal/modal";

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

  const dispatch = useAppDispatch();

  const [photoToUpload, setPhotoToUpload] = useState<File | null>(null);

  if (photoToUpload) {
    const newImage = URL.createObjectURL(photoToUpload); //создание временного URl изображения, которое потом диспатчим в state

    dispatch(createPostSliceActions.addImage({ image: newImage }));
    setPhotoToUpload(null);
    setStage(CreatePostStages.Cropping);
  }

  return (
    <>
      <Modal></Modal>
    </>
  );
};
