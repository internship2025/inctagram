import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../../input/input";
import styles from "./signUp.module.css";
import { CheckBox } from "../../checkBox/checkBox";
import Link from "next/link";

type Input = {
  username: string;
  email: string;
  password: number;
  passwordConfirmation: number;
  approval: boolean;
};

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  return (
    <>
      <div className={styles.inputWrapper}>
        <Input label="Username" fullWidth />
        <Input label="Email" type="email" fullWidth />
        <Input showPassword={true} label="Password" type="password" fullWidth />
        <Input
          showPassword={true}
          label="Password confirmation"
          type="password"
          fullWidth
        />
      </div>
      <div className={styles.policy}>
        <CheckBox />
        <span className={styles.text}>
          I agree to the <Link href="">Terms of Service</Link> and{" "}
          <Link href="">Privacy Policy</Link>
        </span>
      </div>
    </>
  );
};
