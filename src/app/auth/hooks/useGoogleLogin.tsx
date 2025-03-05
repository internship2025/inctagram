
import { useLoginWithGoogleMutation } from "@/features/auth/api/auth.api";
import { useGoogleLogin } from "@react-oauth/google";


export const useGoogleAuth = () => {
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  const handleSuccess = async (response: any) => {
    const redirect = process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "universea.ru"
    try {
      const result = await loginWithGoogle({
        code:response.code,
        redirectUrl: redirect
      }).unwrap();
      localStorage.setItem("access_token", result.accessToken);
      localStorage.setItem("email", result.email);
    } catch (error) {

    }
  };


  const handleLoginGoogle = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code", 
  });

  return handleLoginGoogle; 
};