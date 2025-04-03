import styles from "@/features/create-post/ui/croppingContent/croppingContent.module.css";
import { RefObject, useState } from "react";
import { ImageContent } from "@/shared/ui/imageContent/imageContent";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from "@/features/create-post/utils/createPostSlice";
import { CreatePostHeader } from "@/features/create-post/ui/croppingContent/createPostHeader/createPostHeader";
import { CreatePostStages } from "@/features/create-post/ui/createPost";
import Cropper, { Area } from "react-easy-crop";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { getCroppedImage } from "@/features/create-post/utils/getCroppedImage";
import SvgEdit2 from "@/assets/icons/components/Edit2";
import SvgEdit2Outline from "@/assets/icons/components/Edit2Outline";
import SvgMaximize from "@/assets/icons/components/Maximize";
import SvgMaximizeOutline from "@/assets/icons/components/MaximizeOutline";
import SvgCloseOutline from "@/assets/icons/components/CloseOutline";
import { Slider } from "@/shared/ui/slider/slider";
import Image from "@/assets/icons/components/Image";
import SvgImageOutline from "@/assets/icons/components/ImageOutline";
import SvgPlusCircleOutline from "@/assets/icons/components/PlusCircleOutline";
import { ImageUploader } from "@/shared/ui/imageUploader/imageUploader";

type Props = {
  setStage: (stage: CreatePostStages) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  handleFileSelect: () => void;
  setPhotoToUpload: (file: File) => void;
};

export const CroppingContent = ({
  setStage,
  fileInputRef,
  handleFileSelect,
  setPhotoToUpload,
}: Props) => {
  const dispatch = useAppDispatch();
  const imagesState = useAppSelector(createPostSliceSelectors.selectImages);

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [edit, setEdit] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showZoom, setShowZoom] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showImages, setShowImages] = useState(false);
  const [error, setError] = useState("");

  const onSetEdit = async () => {
    if (edit && croppedAreaPixels) {
      const link = await getCroppedImage(
        imagesState[currentImage],
        croppedAreaPixels,
      );

      dispatch(
        createPostSliceActions.setImage({ image: link, index: currentImage }),
      );
    }
    setEdit(!edit);
  };

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className={styles.mainContainer}>
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.AddFiles)}
        title={"Cropping"}
        handleNext={() => setStage(CreatePostStages.Publish)}
      />
      <div className={styles.bodyContainer}>
        <div className={styles.contentContainer}>
          {!edit && (
            <ImageContent
              itemImages={imagesState}
              selectedIndexCallBack={setCurrentImage}
            />
          )}
          {edit && (
            <Cropper
              crop={crop}
              onCropChange={setCrop}
              aspect={1}
              image={imagesState[currentImage]}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              zoom={zoom}
            />
          )}
          <div className={styles.iconContainer}>
            <IconButton className={styles.iconButton} onClick={onSetEdit}>
              {edit ? (
                <SvgEdit2 className={styles.svgEditImage} />
              ) : (
                <SvgEdit2Outline />
              )}
            </IconButton>
            <IconButton
              className={styles.iconButton}
              onClick={() => setShowZoom(!showZoom)}
            >
              {showZoom ? (
                <SvgMaximize className={styles.iconMaximize} />
              ) : (
                <SvgMaximizeOutline />
              )}
            </IconButton>
          </div>

          {showZoom && (
            <div className={styles.showZoom}>
              <Slider setZoom={setZoom} zoom={zoom} />
            </div>
          )}
          <IconButton
            className={styles.showImages}
            onClick={() => setShowImages(!showImages)}
          >
            {showImages ? (
              <Image className={styles.svgImage} />
            ) : (
              <SvgImageOutline />
            )}
          </IconButton>

          {showImages && (
            <div className={styles.showImagesContainer}>
              {imagesState.map((image, index) => (
                <div className={styles.relative} key={index}>
                  <img
                    alt={`image ${index + 1}`}
                    className={styles.img}
                    src={image}
                  />
                  <IconButton
                    className={styles.deleteImage}
                    onClick={() => {
                      dispatch(createPostSliceActions.deleteImage({ index }));
                    }}
                  >
                    <SvgCloseOutline className={styles.svgCloseOutline} />
                  </IconButton>
                </div>
              ))}
              <div className={styles.relative}>
                <ImageUploader
                  fileInputRef={fileInputRef}
                  setError={setError}
                  setPhotoUpload={setPhotoToUpload}
                >
                  <IconButton className={styles.circleButton}>
                    <SvgPlusCircleOutline
                      onClick={() => {
                        handleFileSelect();
                      }}
                    />
                  </IconButton>
                </ImageUploader>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
