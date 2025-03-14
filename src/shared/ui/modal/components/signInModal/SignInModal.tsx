"use client";

import { Modal } from "../../modal";
import { SignIn } from "@/shared/ui/modal/components/signIn/SignIn";
import googleImg from "@/shared/ui/modal/assets/google.svg";
import gitImg from "@/shared/ui/modal/assets/git.svg";
import { useGitHubAuth } from "@/features/auth/ui/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/features/auth/ui/hooks/useGoogleLogin";
import { useSignIn } from "@/features/auth/ui/hooks/useSignIn";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export const SignInModal = ({ open, onClose }: Props) => {
  const handleLoginGitHub = useGitHubAuth();
  const handleLoginGoogle = useGoogleAuth();
  const formMethods = useSignIn();

  return (
    <Modal title={"Sign In"} open={open} onClose={onClose}>
      <SignIn
        icons={[
          { src: googleImg, width: 36, height: 36, onClick: handleLoginGoogle },
          { src: gitImg, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
        formMethods={formMethods}
      />
    </Modal>
  );
};
