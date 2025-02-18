import { Input } from "@/common/ui/input/input";
import { Controller, useController, useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./forgotPassword.module.css";
import { Button } from "@/common/ui/button/button";
import Link from "next/link";
import { CheckBox } from "@/common/ui/checkBox/checkBox";
import { useState } from "react";
import recatcha from "./../../assets/recaptcha.svg";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";

export type InputType = {
  email: string;
};

export const ForgotPassword = () => {
  const [isChecked, setIsChecked] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  function handler(data: InputType) {
    console.log(data);
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(handler)}>
        <div className={styles.inputWrapper}>
          <Input placeholder = 'Epam@epam.com' error={errors?.email?.message} label="Email" type="email" fullWidth {...register("email")} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.textWrapper}>
          <span>
            Enter your email address and we will send you further instructions
          </span>
        </div>
        <Button fullWidth>Send Link</Button>
        <div className={styles.linkWrapper}>
          <Link href="">Back to Sign In</Link>
        </div>

        <div className={styles.recaptchaWrapper}>
          <div className={styles.recaptcha}>
            <CheckBox
              checked={isChecked}
              onChange={(checked) => {
                setIsChecked(checked as boolean);
              }}
              txt="I’m not a robot"
            />
            <div className={styles.wrapperLink}>
              <div className={styles.image}>
                <Image src={recatcha} alt="" />{" "}
              </div>

              <Link className={styles.link} href="">
                <div>reCAPTCHA</div>
                Privacy - Terms
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
