import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiError } from "@/types/api";
import type { EditDocumentRequest } from "@/types/document";

interface useEditDocumentMutationProps {
	onSuccess?: () => void;
	id: string;
	uploadFile: (file: File) => Promise<{ data: { url: string } }>;
}

export function useEditDocumentMutation({
	onSuccess,
	id,
	uploadFile,
}: useEditDocumentMutationProps) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: EditDocumentRequest) => {
			let documentUrl = data.document_url;

			if (data.document_file) {
				const file = Array.isArray(data.document_file)
					? data.document_file[0]
					: data.document_file;

				if (file instanceof File) {
					const uploadResponse = await uploadFile(file);
					documentUrl = uploadResponse.data.url;
				}
			}

			const payload = {
				...data,
				...(documentUrl && { document_url: documentUrl }),
				document_file: undefined,
			};

			const response = await api.put(`/v1/document/${id}`, payload);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			queryClient.invalidateQueries({ queryKey: ["document", id] });
			toast.success("Berhasil mengedit document!");
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
