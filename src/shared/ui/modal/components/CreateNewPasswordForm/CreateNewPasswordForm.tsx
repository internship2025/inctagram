import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./CreateNewPasswordForm.module.css";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";
import { useCreateNewPasswordMutation } from "@/features/auth/api/auth.api";

export type InputType = {
  password: string;
  passwordConfirmation: string;
};

export const CreateNewPasswordForm = () => {
  const [createNewPassword] = useCreateNewPasswordMutation();

  const searchParams = new URLSearchParams(window.location.search);
  const recoveryCode = searchParams.get("recoveryCode");

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(
       /^[A-Za-z0-9!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
        "Password must contain at least one special character"
      ),
    passwordConfirmation: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match")
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  async function onClick(data: InputType) {
    
    try {
      console.log('Sending data:', data);
      const res = await createNewPassword({
        ...data,
        recoveryCode: recoveryCode as string
      })
      console.log('Success:', res);
    } catch (err) {
      const error = err as any;
      console.log('Error details:', {
        status: error.status,
        data: error.data,
        error: error
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onClick)}>
        <div className={styles.inputWrapper}>
          <Input
            error={errors?.password?.message}
            showPassword={true}
            label="Password"
            type="password"
            fullWidth
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <Input
            error={errors?.passwordConfirmation?.message}
            showPassword={true}
            label="Password confirmation"
            type="password"
            fullWidth
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation ? (
            <p className={styles.error}>
              {errors.passwordConfirmation.message}
            </p>
          ) : (
            <p className={styles.text}>
              Your password must be between 6 and 20 characters
            </p>
          )}
        </div>
        <Button fullWidth>Create new password</Button>
      </form>
    </div>
  );
};
