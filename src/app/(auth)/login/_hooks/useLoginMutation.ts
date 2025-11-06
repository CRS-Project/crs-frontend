import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthStore from "@/app/stores/useAuthStore";
import { setToken } from "@/lib/cookies";
import api from "@/service/api";
import type { ApiError, ApiResponse } from "@/types/api";
import type { LoginRequest, LoginResponse, UserResponse } from "@/types/login";

export default function useLoginMutation() {
	const { login } = useAuthStore();

	const router = useRouter();

	const { mutate, isPending } = useMutation<
		AxiosResponse,
		AxiosError<ApiError>,
		LoginRequest
	>({
		mutationFn: async (data: LoginRequest) => {
			const res = await api.post<ApiResponse<LoginResponse>>(
				"/v1/auth/login",
				data,
			);

			const token = res.data.data.token;
			setToken(token);

			const user = await api.get<ApiResponse<UserResponse>>("/v1/auth/me");

			if (user) login({ ...user.data.data.personal_info, token: token });

			return res;
		},
		onSuccess: () => {
			toast.success("Login successful!");
			router.push("/home");
		},
		onError: (err: AxiosError<ApiError>) => {
			toast.error(
				`${err?.response?.data?.message}: ${err?.response?.data?.error}`,
			);
		},
	});
	return { mutate, isPending };
}
