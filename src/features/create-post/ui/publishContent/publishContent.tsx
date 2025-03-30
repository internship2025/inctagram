import { z } from "zod";
import { CreatePostStages } from "@/features/create-post/ui/createPost";
import styles from "./publishContent.module.css";
import { CreatePostHeader } from "@/features/create-post/ui/croppingContent/createPostHeader/createPostHeader";
import { ImageContent } from "@/shared/ui/imageContent/imageContent";
import { createPostSliceSelectors } from "@/features/create-post/utils/createPostSlice";
import { useAppSelector } from "@/services/store";
import {
  useCreatePostMutation,
  useUploadImageForPostMutation,
} from "@/features/create-post/api/post-api";
import { TextLink } from "@/shared/ui/textLink/textLink";
import { useMeQuery } from "@/features/auth/api/auth.api";

export const publishPostSchema = z.object({
  description: z
    .string({
      required_error: "Description required",
    })
    .max(500),
});

type FormValues = z.infer<typeof publishPostSchema>;

type Props = {
  onPostPublished: () => void;
  setStage: (stage: CreatePostStages) => void;
};

const images = useAppSelector(createPostSliceSelectors.selectImages);

const { data: authData } = useMeQuery();

export const PublishContent = ({ onPostPublished, setStage }: Props) => {
  return (
    <div className={styles.mainContainer}>
      <CreatePostHeader
        handleBack={() => setStage(CreatePostStages.Cropping)}
        title={"Publication"}
        publish
      />
      <div className={styles.bodyContainer}>
        <div className={styles.imageContainer}>
          <ImageContent itemImages={images} />
        </div>
        <div>
          <TextLink
            className={styles.textLinkContainer}
            href={`/profile/${JSON.stringify(authData?.userId)}`}
            size={"large"}
            target={"_blank"}
            underline={false}
          ></TextLink>
        </div>
      </div>
    </div>
  );
};
