import styles from "./reCaptcha.module.css";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type Props = {
  onVerify: (token: string | null) => void;
  siteKey: string;
};

export const Recaptcha = ({ onVerify, siteKey, ...props }: Props) => {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);

  const handleRecaptchaChange = (token: string | null) => {
    setError(null);
    setExpired(false);
    if (token) {
      setIsVerified(true);
      onVerify(token);
    } else {
      setIsVerified(false);
      onVerify(null);
    }
  };

  const handleRecaptchaError = () => {
    setError("Ошибка проверки reCAPTCHA");
    setIsVerified(false);
    onVerify(null);
  };

  const handleRecaptchaExpired = () => {
    setExpired(true);
    setIsVerified(false);
    onVerify(null);
  };

  return (
    <div className={styles.container}>
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleRecaptchaChange}
        onErrored={handleRecaptchaError}
        onExpired={handleRecaptchaExpired}
        theme="dark"
      />
    </div>
  );
};
