import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("The email must match the format example@example.com")
    .min(1, "Email is required"),
});

export type ForgotPasswordFormType = z.infer<typeof emailSchema>;
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

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("The email must match the format example@example.com"),
    username: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30")
      .min(1, "Username is required")
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid username symbols"),
    password: z
      .string()
      .min(6, "Minimum number of characters 6")
      .max(30, "Maximum number of characters 30")
      .min(1, "Password is required")
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|"']).+$/,
        "Password must contain 0-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~",
      ),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
    approval: z.boolean().refine((val) => val, {
      message: "You have to agree to the terms",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type SignUpType = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignInType = z.infer<typeof signInSchema>;
