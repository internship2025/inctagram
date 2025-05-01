export const PATH = {
  CONFIRM_EMAIL: "/auth/registration-confirmation",
  PASSWORD_RECOVERY: "/auth/password-recovery", // forgot password page
  CREATE_NEW_PASSWORD: "/auth/recovery", // creating new password
  PASSWORD_RESET: "/auth/password-reset",
  PRIVACY_POLICY: "/privacy-policy",
  PROFILE: "/profile/:id",
  PROFILE_SETTINGS: "/profile/:id/settings",
  ROOT: "/",
  SIGN_IN: "/auth/sign-in", // login page
  SIGN_UP: "/auth/sign-up", // register new user
  TERMS_OF_SERVICE: "/terms-of-service",
  PUBLIC_HOME: "/public/posts",
  PRIVATE_HOME: "http://localhost:3000",
} as const;

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "universea.ru";
