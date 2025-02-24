import { Modal } from "@/shared/ui/modal/modal";
import { SignUp } from "@/features/auth/ui/signUpModal/signUp/SignUp";
import googleImg from "@/shared/ui/modal/assets/google.svg";
import gitImg from "@/shared/ui/modal/assets/git.svg";

type Props = {
  open: boolean;
  onClose?: () => void;
};

export const SignUpModal = ({ open, onClose }: Props) => {
  return (
    <Modal title={"Sign Up"} open={open}>
      <SignUp
        onClose={onClose}
        icons={[
          { src: googleImg, width: 36, height: 36 },
          { src: gitImg, width: 36, height: 36 },
        ]}
      />
    </Modal>
  );
};
