import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./CreateNewPasswordForm.module.css";
import { Input } from "@/shared/ui/input/input";
import { Button } from "@/shared/ui/button/button";

export type InputType = {
  password: string;
  passwordConfirmation: string;
};

export const CreateNewPasswordForm = () => {
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(5, "Minimum number of characters 6")
      .max(19, "Maximum number of characters 20")
      .required("Password is required"),
    passwordConfirmation: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  function handler(data: InputType) {
    console.log(data);
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handler)}>
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
