"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {Input} from "@/common/ui/input/input"
import {Button} from "@/common/ui/button/button"  
import styles from "./CreateNewPasswordForm.module.css"


const passwordSchema = z.string()
  .min(6, { message: "Пароль должен содержать минимум 6 символов" })
  .max(20, { message: "Пароль не должен превышать 20 символов" })
  .regex(/[0-9]/, { message: "Пароль должен содержать хотя бы одну цифру" })
  .regex(/[A-Z]/, { message: "Пароль должен содержать хотя бы одну заглавную букву" })
  .regex(/[a-z]/, { message: "Пароль должен содержать хотя бы одну строчную букву" })
  .regex(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/, { message: "Пароль должен содержать хотя бы один специальный символ" });

  const createNewPasswordSchema = z.object({
    password: passwordSchema,
    confirmPassword: z.string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must not exceed 20 characters")
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
  
  type CreateNewPasswordSchema = z.infer<typeof createNewPasswordSchema>;

export const CreateNewPasswordForm = () => {

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateNewPasswordSchema>({
        resolver: zodResolver(createNewPasswordSchema),
    })

    const onSubmit = async (data: CreateNewPasswordSchema) => {
        try {
          // API запрос на изменение пароля
          console.log('Form data:', data);
          setSuccessMessage('Your password has been changed');
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div className={styles.wrapper}>
      {successMessage && (
        <div className={styles.modal}>
          {/* Модальное окно успеха */}
        </div>
      )}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="New password"
                type="password"
                showPassword
                {...register("password")}
                error={errors.password?.message}
            />
            <Input
                label="Password confirmation"
                type="password"
                showPassword
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />
            <p className={styles.description}>
              Your password must be between 6 and 20 characters
            </p>
            <Button 
              type="submit"
              variant="primary"
              fullWidth
            >
              Create new password
            </Button>
        </form>
        </div>
        
    )

}