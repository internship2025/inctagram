"use client";

import { Modal } from "@/shared/ui/modal/modal";
import { SignUp } from "@/features/auth/ui/signUpModal/signUp/SignUp";
import googleImg from "@/features/auth/ui/assets/google.svg";
import gitImg from "@/features/auth/ui/assets/git.svg";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import { useSignUp } from "@/features/auth/ui/hooks/useSignUp";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose?: () => void;
};

const GoogleIcon = ({ width, height }: { width: number; height: number }) => (
  <Image src={googleImg} alt="Google" width={width} height={height} />
);

const GitHubIcon = ({ width, height }: { width: number; height: number }) => (
  <Image src={gitImg} alt="GitHub" width={width} height={height} />
);

export const SignUpModal = ({ open, onClose }: Props) => {
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();
  const formMethods = useSignUp();

  return (
    <Modal title={"Sign Up"} open={open} onClose={onClose}>
      <SignUp
        icons={[
          { icon: GoogleIcon, width: 36, height: 36, onClick: handleLoginGoogle },
          { icon: GitHubIcon, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
        formMethods={formMethods}
        onClose={onClose}
      />
    </Modal>
  );
};
