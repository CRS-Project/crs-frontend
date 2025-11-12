import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiError } from "@/types/api";
import type { EditConcernRequest } from "@/types/concern";

interface useEditConcernMutationProps {
	onSuccess?: () => void;
	id: string;
	packageId: string;
}

export function useEditConcernMutation({
	onSuccess,
	id,
	packageId,
}: useEditConcernMutationProps) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: EditConcernRequest) => {
			const payload = {
				...data,
				package_id: packageId,
			};

			const response = await api.put(
				`/v1/area-of-concern-group/${id}`,
				payload,
			);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["concern"] });
			queryClient.invalidateQueries({ queryKey: ["concern", id] });
			queryClient.invalidateQueries({ queryKey: ["concern-stats"] });
			toast.success("Berhasil mengedit concern!");
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
