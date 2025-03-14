"use client";

import { Modal } from "@/shared/ui/modal/modal";
import { SignUp } from "@/features/auth/ui/signUpModal/signUp/SignUp";
import googleImg from "@/shared/ui/modal/assets/google.svg";
import gitImg from "@/shared/ui/modal/assets/git.svg";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import { useSignUp } from "@/features/auth/ui/hooks/useSignUp";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export const SignUpModal = ({ open, onClose }: Props) => {
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();
  const formMethods = useSignUp();

  return (
    <Modal title={"Sign Up"} open={open} onClose={onClose}>
      <SignUp
        icons={[
          { src: googleImg, width: 36, height: 36, onClick: handleLoginGoogle },
          { src: gitImg, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
        formMethods={formMethods}
      />
    </Modal>
  );
};
