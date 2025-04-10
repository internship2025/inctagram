export type MeResponse = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};

export type SignUpArgs = {
  userName: string;
  email: string;
  password: string;
};

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type ForgotPassword = {
  email: string;
  recaptcha?: string;
  baseUrl: string;
};

export type CreateNewPassword = {
  newPassword: string;
  recoveryCode: string;
};

export type ResendConfirmationArgs = {
  email: string;
};

export type ConfirmEmailArgs = {
  confirmationCode: string;
};

export type loginWithGoogleArgs = {
  redirectUrl: string;
  code: string;
};

export type loginWithGoogleResponse = {
  accessToken: string;
  email: string;
};
