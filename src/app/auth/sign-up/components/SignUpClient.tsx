"use client";

import { SignUp } from "@/features/auth/ui/signUpModal/signUp/SignUp";
import { AuthLayout } from "@/shared/ui/modal/components/authLayout/AuthLayout";
import { useSignUp } from "@/features/auth/ui/hooks/useSignUp";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import googleImg from "@/assets/icons/components/GoogleSvg";
import gitImg from "@/assets/icons/components/GithubSvg";

export const SignUpClient = () => {
  const formMethods = useSignUp();
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();

  return (
    <AuthLayout title="Sign Up">
      <SignUp
        icons={[
          { icon: googleImg, width: 36, height: 36, onClick: handleLoginGoogle },
          { icon: gitImg, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
        formMethods={formMethods}
      />
    </AuthLayout>
  );
};
