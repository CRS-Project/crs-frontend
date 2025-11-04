export type ForgotPasswordRequest = {
	usernameEmail: string;
};

export type ResetPasswordRequest = {
	newPassword: string;
	confirmNewPassword: string;
};
