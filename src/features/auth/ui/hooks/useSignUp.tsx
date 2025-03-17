import { useState } from "react";
import { useForm, SubmitHandler, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@/features/auth/api/auth.api";
import { signUpSchema, SignUpType } from "@/app/auth/types/schema";

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const [signup, { isLoading }] = useSignupMutation();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const {
    field: { value, onChange },
  } = useController({ name: "approval", control });

  const signupHandler: SubmitHandler<SignUpType> = async (data) => {
    try {
      await signup({
        userName: data.username,
        email: data.email,
        password: data.password,
      })
        .unwrap()
        .then(() => {
          setUserEmail(data.email);
          setIsFormVisible(false);
        });
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    isValid,
    isDirty,
    isLoading,
    isFormVisible,
    userEmail,
    setIsFormVisible,
    signupHandler,
    value,
    onChange,
  };
};
