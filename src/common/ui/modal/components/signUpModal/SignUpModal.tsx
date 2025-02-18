import { Modal } from "../../modal"
import { SignUp } from "../signUp/SignUp"
import googleImg from './../../assets/google.svg'
import gitImg from './../../assets/git.svg'

type Props = {
    open: boolean
    onClose: ()=> void
}

export const SignUpModal = ({open, onClose}: Props)=>{

    return(
        <Modal
            title={"Sign Up"}
            open = {open}
            onClose = {onClose}
          >
            <SignUp onClose = {onClose} icons={[
              { src: googleImg, width: 36, height: 36 },
              { src: gitImg, width: 36, height: 36 },
            ]}/>
          </Modal> 
    )
}