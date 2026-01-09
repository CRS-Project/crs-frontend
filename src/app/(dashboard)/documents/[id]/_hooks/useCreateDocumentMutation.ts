import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { formatDateForRequest } from "@/lib/utils";
import api from "@/service/api";
import type { ApiError } from "@/types/api";
import type { CreateDocumentRequest } from "@/types/document";

interface useCreateDocumentMutationProps {
	onSuccess?: () => void;
	uploadFile: (file: File) => Promise<{ data: { url: string } }>;
	packageId: string;
}

export function useCreateDocumentMutation({
	onSuccess,
	uploadFile,
	packageId,
}: useCreateDocumentMutationProps) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: CreateDocumentRequest) => {
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
				...(data.due_date
					? { due_date: formatDateForRequest(data.due_date) }
					: { due_date: null }),
				package_id: packageId,
				document_file: undefined,
			};

			const response = await api.post("/v1/document", payload);
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
