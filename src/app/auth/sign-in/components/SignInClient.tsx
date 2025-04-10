"use client";

import { SignIn } from "@/features/auth/ui/signIn/SignIn";
import { AuthLayout } from "@/shared/ui/modal/components/authLayout/AuthLayout";
import { useSignIn } from "@/features/auth/ui/hooks/useSignIn";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import googleImg from "@/assets/icons/components/GoogleSvg";
import gitImg from "@/assets/icons/components/GithubSvg";

export const SignInClient = () => {
  const formMethods = useSignIn();
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();

  return (
    <AuthLayout title="Sign In">
      <SignIn
        icons={[
          { icon: googleImg, width: 36, height: 36, onClick: handleLoginGoogle },
          { icon: gitImg, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
        formMethods={formMethods}
      />
    </AuthLayout>
  );
};
