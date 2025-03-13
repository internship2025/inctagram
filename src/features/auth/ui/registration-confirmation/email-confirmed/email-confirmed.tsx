"use client";

import { PATH } from "@/shared/constants/app-paths";
import { Button } from "@/shared/ui/button/button";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/shared/ui/typography/typography";
import styles from "./confirmed.module.css";

export const EmailConfirmed = () => {
  return (
    <div className={styles.confirmedContainer}>
      <Typography className={styles.congratulations} variant={"h1"}>
        Congratulations!
      </Typography>
      <Typography className={styles.emailConfirmed}>
        Your email has been confirmed!
      </Typography>
      <Button variant={"primary"} className={styles.singInButton}>
        <Link href={PATH.SIGN_IN}>Sign in</Link>
      </Button>
      <Image
        alt={"success image"}
        height={293}
        src={"/images/success.svg"}
        width={430}
      />
    </div>
  );
};
