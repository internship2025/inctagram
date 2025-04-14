import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ControlledTextArea } from "@/shared/ui/controlled/controlledTextArea";
import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";
import s from "./postEdit.module.css";
import { useEditPostMutation } from "@/features/create-post/api/post.api";

type Props = {
  postId: number;
  postDescription: string;
  postImg: string;
  onCancel: () => void;
  onSuccess: () => void;
  onChangesDetected: (hasChanges: boolean) => void;
};

export const PostEdit = ({
  postId,
  postDescription,
  postImg,
  onCancel,
  onSuccess,
  onChangesDetected,
}: Props) => {
  const [editPost, { isLoading }] = useEditPostMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      description: postDescription,
    },
  });

  const description = watch("description");
  const characterCount = description.length;
  const maxLength = 500;
  const isOverLimit = characterCount > maxLength;

  useEffect(() => {
    onChangesDetected(isDirty);
  }, [isDirty, onChangesDetected]);

  const onSubmit = async (data: { description: string }) => {
    try {
      await editPost({ id: postId, description: data.description }).unwrap();
      onSuccess();
    } catch (error) {
      console.error("Failed to edit post:", error);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.imageContainer}>
        <Image src={postImg} alt="Post image" fill sizes={"100%"} />
      </div>

      <div className={s.form}>
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <ControlledTextArea
            className={s.textareaInput}
            control={control}
            name="description"
            label={"post.editDescription"}
            rules={{
              maxLength: {
                value: maxLength,
                message: `Maximum length is ${maxLength} characters`,
              },
            }}
          />
          <Typography
            variant="small"
            className={s.numLettersText}
            color={isOverLimit ? "error" : "success"}
          >
            {characterCount}/{maxLength}
          </Typography>

          <div className={s.actions}>
            <Button
              type="button"
              variant="outline"
              className={s.cancelButton}
              onClick={onCancel}
            >
              Отмена
            </Button>

            <Button
              type="submit"
              disabled={isOverLimit || !isDirty || isLoading}
              className={s.submitButton}
            >
              Сохранить изменения
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
