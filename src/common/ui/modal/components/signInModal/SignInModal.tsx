import { Modal } from "../../modal";
import { SignIn } from "../signIn/SignIn";
import googleImg from "./../../assets/google.svg";
import gitImg from "./../../assets/git.svg";

type Type = {
  open: boolean;
  onClose: () => void;
};

export const SignInModal = ({ open, onClose }: Type) => {
  return (
    <Modal
      title={"Sign In"}
      open={open}
      onClose={onClose}
     
    >
      <SignIn onClose={onClose}  icons={[
        { src: googleImg, width: 36, height: 36 },
        { src: gitImg, width: 36, height: 36 },
      ]} />
    </Modal>
  );
};
