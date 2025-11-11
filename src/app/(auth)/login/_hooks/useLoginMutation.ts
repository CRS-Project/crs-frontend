import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthStore from "@/app/stores/useAuthStore";
import { setToken } from "@/lib/cookies";
import api from "@/service/api";
import type { ApiError, ApiResponse } from "@/types/api";
import type { LoginRequest, LoginResponse, UserResponse } from "@/types/login";
import type { User } from "@/types/user";

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

			const response = await api.get<ApiResponse<UserResponse>>("/v1/auth/me");

			if (response) {
				const data = response.data.data;

				const flattenedUser: User = {
					id: data.personal_info.id,
					name: data.personal_info.name,
					email: data.personal_info.email,
					initial: data.personal_info.initial,
					institution: data.personal_info.institution,
					photo_profile: data.personal_info.photo_profile,
					role: data.personal_info.role,

					package: data.package_access?.name ?? "",
					package_id: data.package_access?.id ?? null,

					discipline: data.user_discipline_info.discipline,
					discipline_number: data.user_discipline_info.number,
					discipline_id: null,
				};

				login({ ...flattenedUser, token });
			}

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
