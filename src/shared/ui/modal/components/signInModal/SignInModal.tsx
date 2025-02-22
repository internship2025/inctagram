import { Modal } from "../../modal";
import { SignIn } from "@/shared/ui/modal/components/signIn/SignIn";
import googleImg from "@/shared/ui/modal/assets/google.svg";
import gitImg from "@/shared/ui/modal/assets/git.svg";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const SignInModal = ({ open, onClose }: Type) => {
  return (
    <Modal title={"Sign In"} open={open} onClose={onClose}>
      <SignIn
        onClose={onClose}
        icons={[
          { src: googleImg, width: 36, height: 36 },
          { src: gitImg, width: 36, height: 36 },
        ]}
      />
    </Modal>
  );
};
