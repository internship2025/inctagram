import { Modal } from "../../modal";
import { SignIn } from "@/shared/ui/modal/components/signIn/SignIn";
import googleImg from "@/shared/ui/modal/assets/google.svg";
import gitImg from "@/shared/ui/modal/assets/git.svg";
import { useGitHubAuth } from "@/app/auth/hooks/useGitHubAuth";
import { useGoogleAuth } from "@/app/auth/hooks/useGoogleLogin";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const SignInModal = ({ open, onClose }: Type) => {
    const handleLoginGitHub = useGitHubAuth();
    const handleLoginGoogle = useGoogleAuth();
  return (
    <Modal title={"Sign In"} open={open} onClose={onClose}>
      <SignIn
        onClose={onClose}
        icons={[
          { src: googleImg, width: 36, height: 36, onClick: handleLoginGoogle  },
          { src: gitImg, width: 36, height: 36, onClick: handleLoginGitHub },
        ]}
      />
    </Modal>
  );
};
