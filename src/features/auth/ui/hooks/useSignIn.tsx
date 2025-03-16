import { SubmitHandler, useForm } from "react-hook-form";
import { SignInType, signInSchema } from "@/app/auth/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginArgs,
  useLazyMeQuery,
  useLoginMutation,
} from "@/features/auth/api/auth.api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const [login] = useLoginMutation();
  const [getUser] = useLazyMeQuery();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin: SubmitHandler<SignInType> = async (data: LoginArgs) => {
    try {
      setErrorMessage(null);
      const response = await login(data).unwrap();
      console.log("Вход выполнен успешно:", response);

      if (response) {
        const accessToken = response.accessToken;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("email", data.email);
        }
        // Если вход успешен, получаем данные пользователя
        const userResponse = await getUser().unwrap();
        router.push(PATH.PRIVATE_HOME);

        console.log("Данные пользователя:", userResponse);
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      setErrorMessage("Неверный email или пароль");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    errorMessage,
  };
};
