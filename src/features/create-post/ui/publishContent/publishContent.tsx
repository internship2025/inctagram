import { z } from "zod";
import { CreatePostStages } from "@/features/create-post/ui/createPost";

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

export const PublishContent = ({ onPostPublished, setStage }: Props) => {
  return <div></div>;
};
