
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "../../input/input"


type Input = {
    username: string
    email: string
    password: number
    passwordConfirmation: number
    approval: boolean
}


export const SignUp = ()=>{
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<Input>()


    return (
        <>
          <Input label="Username" fullWidth/>
        </>
    )
}