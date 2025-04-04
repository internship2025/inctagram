import { z } from "zod";
import { CreatePostStages } from "@/features/create-post/ui/createPost";
import styles from "./publishContent.module.css";
import { CreatePostHeader } from "@/features/create-post/ui/croppingContent/createPostHeader/createPostHeader";
import { ImageContent } from "@/shared/ui/imageContent/imageContent";
import {
  createPostSliceActions,
  createPostSliceSelectors,
} from "@/features/create-post/utils/createPostSlice";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  useCreatePostMutation,
  useUploadImageForPostMutation,
} from "@/features/create-post/api/post.api";
import { TextLink } from "@/shared/ui/textLink/textLink";
import { useMeQuery } from "@/features/auth/api/auth.api";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { useGetPublicUserProfileQuery } from "@/features/user-profile/api/userProfile.api";
import Loading from "@/app/loading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextArea } from "@/shared/ui/controlledTextArea/controlledTextArea";
import { toast } from "react-toastify";

export const publishPostSchema = z.object({
  description: z
    .string({
      required_error: "Description required",
    })
    .max(500),
});

type FormValues = z.infer<typeof publishPostSchema>;

type CroppingDialogContentProps = {
  onPostPublished: () => void;
  setStage: (stage: CreatePostStages) => void;
};

export const PublishContent = ({
  onPostPublished,
  setStage,
}: CroppingDialogContentProps) => {
  const [createPost, { isLoading: isLoadingCreatePost }] =
    useCreatePostMutation();

  const [uploadPhoto, { isLoading: isLoadingUploadPhoto }] =
    useUploadImageForPostMutation();

  const images = useAppSelector(createPostSliceSelectors.selectImages);

  const { data: authData } = useMeQuery();

  const { data: profileData, isLoading: profileIsLoading } =
    useGetPublicUserProfileQuery(authData!.userId, {
      skip: authData?.userId === undefined,
    });

  let profileAvatarUrl = undefined;

  if (profileData?.avatars && profileData?.avatars.length > 0) {
    if (profileData?.avatars[0].url) {
      profileAvatarUrl = profileData?.avatars[0].url;
    }
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(publishPostSchema) });

  const dispatch = useAppDispatch();

  const onSubmitHandler = async ({ description }: FormValues) => {
    const uploadIds = [] as string[];

    for (let i = 0; i < images.length; i++) {
      const res = await fetch(images[i]);

      if (!res.ok) {
        toast.error("Failed to load image");
        return;
      }

      const blob = await res.blob();
      const file = new File([blob], `postImage${i + 1}.png`, {
        type: "image/png",
      });

      await uploadPhoto({ file })
        .unwrap()
        .then((res) => {
          uploadIds.push(res.images[0].uploadId);
        });
    }

    if (uploadIds.length === 0) {
      toast.error("No images uploaded");
      return;
    }

    createPost({
      description,
      uploadIds,
    })
      .unwrap()
      .then(() => {
        onPostPublished();
        images.forEach((image) => URL.revokeObjectURL(image));
        dispatch(createPostSliceActions.setImages({ images: [] }));
      })
      .catch((error: unknown) => {
        console.log(error, setError, ["childrenMetadata"]);
      });
  };

  return (
    <div className={styles.mainContainer}>
      {(isLoadingCreatePost || isLoadingUploadPhoto) && <Loading />}
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.Cropping)}
        title={"Publication"}
        publish
      />
      <div className={styles.bodyContainer}>
        <div className={styles.imageContainer}>
          <ImageContent itemImages={images} />
        </div>
        <div className={styles.descriptionContainer}>
          {!profileIsLoading ? (
            <div>
              <TextLink
                className={styles.textLinkContainer}
                href={`/profile/${JSON.stringify(authData?.userId)}`}
                size={"large"}
                target={"_blank"}
                underline={false}
              >
                <Avatar
                  alt={"avatar"}
                  className={styles.avatar}
                  size={9}
                  src={profileAvatarUrl}
                />
                {profileData?.userName}
              </TextLink>
            </div>
          ) : (
            <Loading />
          )}
          <form
            id={"publish-form"}
            className={styles.form}
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <ControlledTextArea
              control={control}
              error={!!errors.description}
              helperText={errors.description?.message}
              name={"description"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
