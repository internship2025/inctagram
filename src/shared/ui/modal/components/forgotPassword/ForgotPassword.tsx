import { Input } from "@/shared/ui/input/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./forgotPassword.module.css";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { EmailSentModal } from "../emailSentModal/EmailSentModal";
import { PATH, baseUrl } from "@/shared/constants/app-paths";
import { Recaptcha } from "@/features/auth/ui/reCaptcha/reCaptcha";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("The email must match the format example@example.com")
    .min(1, "Email is required"),
});

type InputType = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<InputType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const email = watch("email");
  const isButtonDisabled = !email || !recaptchaValue || isLoading;

  async function onSubmit(data: InputType) {
    try {
      if (!recaptchaValue) {
        setError("email", {
          message: "Please complete the reCAPTCHA verification",
        });
        return;
      }

      await forgotPassword({
        email: data.email,
        recaptcha: recaptchaValue,
        baseUrl: baseUrl,
      }).unwrap();
      setSentEmail(data.email);
      setShowEmailSentModal(true);
    } catch (err) {
      const fetchError = err as FetchBaseQueryError;
      if ("status" in fetchError && fetchError.status === 400) {
        setError("email", { message: "User with this email doesn't exist" });
      }
      setRecaptchaValue(null);
    }
  }

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
                  setError("email", { message: undefined });
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
          router.push(`${PATH.PASSWORD_RESET}?email=${sentEmail}`);
        }}
      />
    </>
  );
};
