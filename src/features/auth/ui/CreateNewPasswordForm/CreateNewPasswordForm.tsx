import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import styles from "./CreateNewPasswordForm.module.css";
import { useCreateNewPasswordForm } from "@/features/auth/ui/hooks/useCreateNewPasswordForm";

export const CreateNewPasswordForm = () => {
  const { form, onSubmit, isLoading } = useCreateNewPasswordForm();

  return (
    <div className={styles.wrapper}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <Input
            error={form.formState.errors?.password?.message}
            showPassword={true}
            label="Password"
            type="password"
            fullWidth
            {...form.register("password")}
          />
          {form.formState.errors?.password && (
            <span className={styles.error}>
              {form.formState.errors?.password?.message}
            </span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <Input
            error={form.formState.errors?.passwordConfirmation?.message}
            showPassword={true}
            label="Password confirmation"
            type="password"
            fullWidth
            {...form.register("passwordConfirmation")}
          />
          {form.formState.errors?.passwordConfirmation ? (
            <p className={styles.error}>
              {form.formState.errors?.passwordConfirmation?.message}
            </p>
          ) : (
            <p className={styles.text}>
              Your password must be between 6 and 20 characters
            </p>
          )}
        </div>
        <Button fullWidth disabled={isLoading}>
          {isLoading ? "Creating..." : "Create new password"}
        </Button>
      </form>
    </div>
  );
};
