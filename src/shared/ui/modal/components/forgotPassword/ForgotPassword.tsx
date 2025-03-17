import { Input } from "@/shared/ui/input/input";
import styles from "./forgotPassword.module.css";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EmailSentModal } from "../emailSentModal/EmailSentModal";
import { PATH } from "@/shared/constants/app-paths";
import { Recaptcha } from "@/features/auth/ui/reCaptcha/reCaptcha";
import { useForgotPasswordForm } from "@/features/auth/ui/hooks/useForgotPasswordForm";

export const ForgotPassword = () => {
  const router = useRouter();
  const {
    form,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    onSubmit,
    setRecaptchaValue,
    isButtonDisabled,
    isLoading,
    showEmailSentModal,
    setShowEmailSentModal,
    sentEmail,
  } = useForgotPasswordForm();

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <Input
              placeholder="Epam@epam.com"
              error={errors?.email?.message}
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
            />
          </div>
          <div className={styles.textWrapper}>
            <span>
              Enter your email address and we will send you further instructions
            </span>
          </div>

          <Button fullWidth disabled={isButtonDisabled}>
            {isLoading ? "Sending..." : "Send Link"}
          </Button>

          <div className={styles.linkWrapper}>
            <Link href={PATH.SIGN_IN}>Back to Sign In</Link>
          </div>

          <div className={styles.recaptchaWrapper}>
            <Recaptcha
              siteKey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "6LfpOuMqAAAAAE9xTZ1PP4CH-WUsTq5al9vEw0nJ"
              }
              onVerify={(token) => {
                setRecaptchaValue(token);
                if (
                  errors.email?.message ===
                  "Please complete the reCAPTCHA verification"
                ) {
                  form.setError("email", { message: undefined });
                }
              }}
            />
          </div>
        </form>
      </div>
      <EmailSentModal
        open={showEmailSentModal}
        email={sentEmail}
        onClose={() => {
          setShowEmailSentModal(false);
          router.push(PATH.SIGN_IN);
        }}
      />
    </>
  );
};
