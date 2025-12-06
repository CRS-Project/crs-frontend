import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiError } from "@/types/api";
import type { CreateConcernRequest } from "@/types/concern";

interface useCreateConcernMutationProps {
	onSuccess?: () => void;
	packageId: string;
}

export function useCreateConcernMutation({
	onSuccess,
	packageId,
}: useCreateConcernMutationProps) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CreateConcernRequest) => {
			const payload = {
				user_discipline: data.user_discipline,
				discipline_initial: data.discipline_initial,
				review_focus: data.review_focus,
				consolidators: data.consolidators.map((c) => ({
					user_id: c.user_id,
				})),
				package_id: packageId,
			};

			const response = await api.post("/v1/discipline-group", payload);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["concern"] });
			queryClient.invalidateQueries({ queryKey: ["concern-stats"] });
			toast.success("Berhasil membuat concern baru!");
			if (onSuccess) onSuccess();
		},
		onError: (err: AxiosError<ApiError>) => {
			console.log(err);
			toast.error(
				`${err?.response?.data?.message}: ${err?.response?.data?.error}`,
			);
		},
	});

	return { mutate, isPending };
}
