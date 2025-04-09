"use client";

import styles from "./addAvatarSection.module.css";
import { Avatar } from "@/shared/ui/avatar/avatar";

type Props = {};

export const AddAvatarSection = ({}: Props) => {
  return (
    <div className={styles.avatarContainer}>
      <Avatar alt={"User avatar"} src={} />
    </div>
  );
};
