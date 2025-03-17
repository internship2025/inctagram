import { useForgotPasswordConfirmation } from "@/features/auth/ui/hooks/useForgotPasswordConfirmation";
import { PATH } from "@/shared/constants/app-paths";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import Link from "next/link";
import styles from "./ForgotPasswordConfirmation.module.css";

export const ForgotPasswordConfirmation = () => {
  const { form, onSubmit, isLoading, email } = useForgotPasswordConfirmation();

  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Input
            error={form.formState.errors?.email?.message}
            label="Email"
            type="email"
            fullWidth
            {...form.register("email")}
            defaultValue={email || ""}
          />
          {form.formState.errors?.email ? (
            <span className={styles.error}>{form.formState.errors?.email.message}</span>
          ) : (
            <p className={styles.text}>
              Enter your email address and we will send you further instructions
            </p>
          )}
        </div>
        <div className={styles.textWrapper}>
          <p>
            The link has been sent by email. If you don’t receive an email send
            link again
          </p>
        </div>
        <Button fullWidth disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Link Again"}
        </Button>
        <div className={styles.linkWrapper}>
          <Link href={PATH.SIGN_IN}>Back to Sign In</Link>
        </div>
      </form>
    </div>
  );
};
