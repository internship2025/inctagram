import styles from "./emailSent.module.css";
import { Button } from "@/shared/ui/button/button";

export const EmailSent = ({
  onClose,
  email,
}: {
  onClose?: () => void;
  email: string;
}) => {
  return (
    <>
      <div className={styles.line}></div>
      <div className={styles.wrapper}>
        <span className={styles.text}>
          {`We have sent a link to confirm your email to ${email}`}
        </span>
        <div className={styles.container}>
          <Button onClick={onClose}>OK</Button>
        </div>
      </div>
    </>
  );
};
