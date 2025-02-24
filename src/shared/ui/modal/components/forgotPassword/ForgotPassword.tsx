import { Input } from "@/shared/ui//input/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./forgotPassword.module.css";
import { Button } from "@/shared/ui/button/button";
import Link from "next/link";
import { CheckBox } from "@/shared/ui/checkBox/checkBox";
import { useState } from "react";
import recatcha from "@/shared/ui/modal/assets/recaptcha.svg";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { EmailSentModal } from "../emailSentModal/EmailSentModal";

export type InputType = {
  email: string;
  recaptcha: string;  
};

export const ForgotPassword = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("The email must match the format example@example.com")
      .required("Email is required"),
    recaptcha: yup
      .string()
      .required("Recaptcha is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch
  } = useForm<InputType>({ resolver: yupResolver(schema), mode: "onBlur" });

  const email = watch("email");
  const isButtonDisabled = !email || !isChecked || isLoading;

  async function onSubmit(data: InputType) {      
    
    if (!isChecked) {     
      setError("recaptcha", { message: "Please confirm you are not a robot" });
      return;
    }
    console.log('Form data:', data);
    try {
      const res = await forgotPassword(data)
      setSentEmail(data.email);
      setShowEmailSentModal(true);      

    } catch (err) {
      const fetchError = err as FetchBaseQueryError; 
      if ('status' in fetchError && fetchError.status === 400) {
    setError("email", { message: "Invalid email address" });
  } else {
    console.log('Failed to reset password:', fetchError)
      }
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
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.textWrapper}>
          <span>
            Enter your email address and we will send you further instructions
          </span>
        </div>        

        <Button fullWidth disabled={isButtonDisabled}>
          {isLoading ? 'Sending...' : 'Send Link'}
        </Button>        
        {error && (
          <div className={styles.error}>
            Something went wrong. Please try again.
          </div>
        )}


        <div className={styles.linkWrapper}>
          <Link href="">Back to Sign In</Link>
        </div>

        <div className={styles.recaptchaWrapper}>
        <input type="hidden" {...register("recaptcha")} />          
          <div className={styles.recaptcha}>
            <CheckBox
              checked={isChecked}
              onChange={(checked) => {          
                setIsChecked(checked as boolean);
                setValue("recaptcha", checked ? "checked" : "");
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
    <EmailSentModal
      open={showEmailSentModal}
      onClose={() => setShowEmailSentModal(false)}
      email={sentEmail}
    />
    </>
    
  );
};
