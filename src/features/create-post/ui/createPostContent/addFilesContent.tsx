import { Typography } from "@/shared/ui/typography/typography";
import { useState } from "react";
import { useAppSelector } from "@/services/store";
import { createPostSliceSelectors } from "@/features/create-post/utils/createPostSlice";
import styles from "./addFilesContent.module.css";

type Props = {};

export const AddFilesContent = () => {
  const [error, setError] = useState("");

  const draftImages = useAppSelector(
    createPostSliceSelectors.selectDraftImages,
  );

  return (
    <div>
      <div>
        <Typography>{"Add Photo"}</Typography>
      </div>
      <div className={styles.bodyContainer}></div>
    </div>
  );
};
