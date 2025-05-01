"use client";

import { Modal } from "@/shared/ui/modal/modal";
import { SignIn } from "@/features/auth/ui/signIn/SignIn";
import googleImg from "@/features/auth/ui/assets/google.svg";
import gitImg from "@/features/auth/ui/assets/git.svg";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import { useSignIn } from "@/features/auth/ui/hooks/useSignIn";
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

export const SignInModal = ({ open, onClose }: Props) => {
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();
  const formMethods = useSignIn();

  return (
    <Modal title={"Sign In"} open={open} onClose={onClose}>
      <SignIn
        icons={[
          {
            icon: GoogleIcon,
            width: 36,
            height: 36,
            onClick: handleLoginGoogle,
          },
          {
            icon: GitHubIcon,
            width: 36,
            height: 36,
            onClick: handleLoginGitHub,
          },
        ]}
        formMethods={formMethods}
      />
    </Modal>
  );
};
