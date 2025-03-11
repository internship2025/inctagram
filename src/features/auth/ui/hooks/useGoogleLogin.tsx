"use client";

import { useLoginWithGoogleMutation } from "@/features/auth/api/auth.api";
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleAuthResponse {
  code: string;
}

export const useGoogleAuth = () => {
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  const handleSuccess = async (response: GoogleAuthResponse) => {
    const redirect =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "universea.ru";
    try {
      const result = await loginWithGoogle({
        code: response.code,
        redirectUrl: redirect,
      }).unwrap();
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", result.accessToken);
        localStorage.setItem("email", result.email);
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });

  return handleLoginGoogle;
};
