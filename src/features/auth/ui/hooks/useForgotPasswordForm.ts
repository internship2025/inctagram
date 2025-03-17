import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForgotPasswordMutation } from "@/features/auth/api/auth.api"
import { ForgotPasswordFormType, emailSchema } from "../../../../app/auth/types/schema"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { baseUrl } from "@/shared/constants/app-paths"

export const useForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const [showEmailSentModal, setShowEmailSentModal] = useState(false)
  const [sentEmail, setSentEmail] = useState("")
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

  const form = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(emailSchema),
    mode: "onBlur",
  })

  const email = form.watch("email")
  const isButtonDisabled = !email || !recaptchaValue || isLoading

  const onSubmit = async (data: ForgotPasswordFormType) => {
    try {
      if (!recaptchaValue) {
        form.setError("email", {
          message: "Please complete the reCAPTCHA verification",
        })
        return
      }

      await forgotPassword({
        email: data.email,
        recaptcha: recaptchaValue,
        baseUrl: baseUrl,
      }).unwrap()
      setSentEmail(data.email)
      setShowEmailSentModal(true)
    } catch (err) {
      const fetchError = err as FetchBaseQueryError
      if ("status" in fetchError && fetchError.status === 400) {
        form.setError("email", { message: "User with this email doesn't exist" })
      }
      setRecaptchaValue(null)
    }
  }

  return {
    form,
    onSubmit,
    recaptchaValue,
    setRecaptchaValue,
    isButtonDisabled,
    isLoading,
    showEmailSentModal,
    setShowEmailSentModal,
    sentEmail
  }
}
