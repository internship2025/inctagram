import styles from "@/features/create-post/ui/croppingContent/croppingContent.module.css";
import {useState} from "react";

type Props = {};

export const CroppingContent = () => {
    const [edit, setEdit] = useState(false)

  return (
    <div className={styles.mainContainer}>
      <div></div>
      <div className={styles.bodyContainer}>
        <div className={styles.contentContainer}>
            {!edit && (

            )}
        </div>
      </div>
    </div>
  );
};
