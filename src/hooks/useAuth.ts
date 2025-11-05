import { useMutation } from "@tanstack/react-query";
import { setToken } from "@/lib/cookies";
import { post } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { LoginResponse } from "@/types/login";

export const useLogin = ({
	onSuccess,
	onError,
}: {
	onSuccess: (data: LoginResponse) => void;
	onError: (error: Error) => void;
}) => {
	return useMutation<LoginResponse, Error, FormData>({
		mutationFn: async (body: FormData) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.Login, body);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
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
		mutationFn: async (body: FormData) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.ForgotPassword, body);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
			}
			return Kind;
		},
		mutationKey: ["forgot-password"],
		onSuccess,
		onError,
	});
};

export const useResetPassword = ({
	onSuccess,
	onError,
}: {
	onSuccess: () => void;
	onError: (error: Error) => void;
}) => {
	return useMutation({
		mutationFn: async (body: FormData) => {
			const { Kind, OK } = await post(MAIN_ENDPOINT.Auth.ResetPassword, body);
			if (!OK) {
				throw new Error(
					(Kind as { message: string }).message ||
						(Kind as { Message: string }).Message,
				);
			}
			return Kind;
		},
		mutationKey: ["reset-password"],
		onSuccess,
		onError,
	});
};
