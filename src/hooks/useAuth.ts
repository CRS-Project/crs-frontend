import { useMutation } from "@tanstack/react-query";
import { setToken } from "@/lib/cookies";
import { post } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { LoginRequest, LoginResponse } from "@/types/login";
import type {
	ForgotPasswordRequest,
	ResetPasswordRequest,
} from "@/types/reset";

export const useLogin = ({
	onSuccess,
	onError,
}: {
	onSuccess: (data: LoginResponse) => void;
	onError: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: async (body: LoginRequest) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.Login, body);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			setToken((Kind as { data: { token: string } }).data.token);
			return Kind as LoginResponse;
		},
		mutationKey: ["login"],
		onSuccess,
		onError,
	});
};

export const useForgotPassword = ({
	onSuccess,
	onError,
}: {
	onSuccess: () => void;
	onError: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: async (body: ForgotPasswordRequest) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.ForgotPassword, body);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["forgot-password"],
		onSuccess,
		onError,
	});
};

export const useResetPassword = ({
	id,
	onSuccess,
	onError,
}: {
	id: string;
	onSuccess: () => void;
	onError: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: async (body: ResetPasswordRequest) => {
			const { Kind, OK } = await post(
				MAIN_ENDPOINT.Auth.ResetPassword.replace("id", id),
				body,
			);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["reset-password"],
		onSuccess,
		onError,
	});
};
