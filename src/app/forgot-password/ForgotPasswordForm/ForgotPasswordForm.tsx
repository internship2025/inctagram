"use client";
import { useState } from "react";
import styles from "./ForgotPasswordForm.module.css";
import { Input } from "@/common/ui/input/input";
import {Button} from "@/common/ui/button/button";
import { useForm } from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const forgotPasswordSchema = z.object({
  email: z
  .string()
  .min(1, "Email is required")
  .email("Email must be valid"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;


export const ForgotPasswordForm = () => {
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    })

const email = watch("email");    

const onSubmit = async (data: ForgotPasswordSchema) => {
  if (!isRecaptchaVerified) return;

      try {
        // API запрос на сброс пароля
        console.log('Form data:', data)
        // После успешной отправки показываем сообщение
      setSuccessMessage(`We have sent a link to confirm your email to ${data.email}`);
      } catch (error) {
        console.error('Error:', error)
      }
    };  

const handleRecaptchaChange = (value: string | null) => {
    setIsRecaptchaVerified(!!value);
  }; 
  
const isSubmitDisabled = !isValid || !isRecaptchaVerified;

  return (
    <div className={styles.wrapper}>
      {/* Модальное окно с сообщением об успехе */}
      {successMessage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Email sent</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setSuccessMessage(null)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.successMessage}>
                {successMessage}
              </div>
              <div className={styles.modalFooter}>
                <Button
                  variant="primary"
                  onClick={() => setSuccessMessage(null)}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}      
        
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input 
            label="Email" 
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <p className={styles.description}>
            Enter your email address and we will send you further instructions
          </p>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isSubmitDisabled}
          >
            Send Link
          </Button>

          <Button
            as="a"
            variant="link"
            href="/sign-in"
            fullWidth
          >
            Back to Sign In
          </Button>

          <div className={styles.reCaptcha}>
            ReCaptcha
          </div>
        </form>
      
    </div>
  );
};
