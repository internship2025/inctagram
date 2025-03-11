import { z } from 'zod'

export const emailSchema = z.object({
  email: z
    .string()
    .email("The email must match the format example@example.com")
    .min(1, "Email is required"),
})

export type ForgotPasswordFormType = z.infer<typeof emailSchema>
export type ConfirmationType = z.infer<typeof emailSchema>;

export const createNewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(
      /[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
      "Password must contain at least one special character (!@#$%^&* etc.)",
    ),
  passwordConfirmation: z.string().min(1, "Password confirmation is required"),
});

export type CreateNewPasswordFormType = z.infer<typeof createNewPasswordSchema>;




