import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiError } from "@/types/api";
import type { ImportDocumentRequest } from "@/types/document";

interface useImportDocumentMutationProps {
	onSuccess?: () => void;
}

export function useImportDocumentMutation({
	onSuccess,
}: useImportDocumentMutationProps) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: ImportDocumentRequest) => {
			const response = await api.post("/v1/document", data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Berhasil membuat document baru!");
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
