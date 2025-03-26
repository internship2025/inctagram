import SvgArrowBackOutline from "@/assets/icons/components/ArrowBackOutline";
import styles from "./createPostHeader.module.css";
import { IconButton } from "@/shared/ui/iconButton/iconButton";
import { Typography } from "@/shared/ui/typography/typography";
import { Button } from "@/shared/ui/button/button";

type Props = {
  handleBack: () => void;
  handleNext?: () => void;
  publish?: boolean;
  title: string;
};

export const CreatePostHeader = ({
  handleBack,
  handleNext,
  publish,
  title,
}: Props) => {
  return (
    <div className={styles.mainHeader}>
      <IconButton className={styles.iconButton} onClick={() => handleBack()}>
        <SvgArrowBackOutline />
      </IconButton>
      <Typography>{title}</Typography>
      {!publish && (
        <Button
          className={styles.nextButton}
          onClick={() => handleNext?.()}
          variant={"text"}
        >
          {"Next"}
        </Button>
      )}
      {publish && (
        <Button
          className={styles.publishButton}
          type={"submit"}
          form={"publish-form"}
        >
          {"Publish"}
        </Button>
      )}
    </div>
  );
};
