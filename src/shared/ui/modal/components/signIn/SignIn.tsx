import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../input/input";
import styles from "./signIn.module.css";
import Link from "next/link";
import { Button } from "../../../button/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import {
  LoginArgs,
  useLazyMeQuery,
  useLoginMutation,
} from "@/features/auth/api/auth.api";

export type InputType = {
  email: string;
  password: string;
};

type Type = {
  icons?: Array<{ src: string; width: number; height: number, onClick?: ()=> void }> | [];
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

  const [login] = useLoginMutation();
  const [getUser] = useLazyMeQuery();

  const handleLogin: SubmitHandler<InputType> = async (data: LoginArgs) => {
    try {
      const response = await login(data).unwrap();
      console.log("Вход выполнен успешно:", response);

      if (response) {
        const accessToken = response.accessToken;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("email", data.email);
        // Если вход успешен, получаем данные пользователя
        const userResponse = await getUser().unwrap();
        console.log("Данные пользователя:", userResponse);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  let images = icons?.map((it, ind) => {
    return (
      <button className={styles.btn} key={ind} onClick={it.onClick}>
        <Image src={it.src} width={it.width} height={it.height} alt="" />
      </button>
    );
  });

  return (
    <>
      <div className={styles.wrapperIcons}>{images}</div>
      <form
        className={styles.wrapper}
        onSubmit={handleSubmit(handleLogin)}
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
