import { useForm } from "react-hook-form";
import { Input } from "../../../input/input";
import styles from "./signIn.module.css";
import Link from "next/link";
import { Button } from "../../../button/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

export type InputType = {
  email: string;
  password: string;
};

type Type = {
  icons?: Array<{ src: string; width: number; height: number }> | [];
  onClose?: () => void;
};

export const SignIn = ({ onClose, icons }: Type) => {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  function handler(data: InputType) {
    console.log(data);
  }

  let images = icons?.map((it, ind) => {
    return (
      <Image
        className={styles.images}
        key={ind}
        src={it.src}
        width={it.width}
        height={it.height}
        alt=""
      />
    );
  });

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
      <form
        className={styles.wrapper}
        onSubmit={handleSubmit(handler)}
        noValidate
      >
        <div className={styles.inputWrapper}>
          <Input label="Email" type="email" fullWidth {...register("email")} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <Input
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
        <div className={styles.forgotPassword}>
          <Link href={""}>Forgot Password</Link>
        </div>
        <Button fullWidth>Sign In</Button>
        <span className={styles.question}>Do you have an account?</span>
        <div>
          <Link href="">Sign In</Link>
        </div>
      </form>
    </>
  );
};
