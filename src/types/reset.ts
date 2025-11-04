export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  new_password: string;
  confirmNewPassword: string;
};
