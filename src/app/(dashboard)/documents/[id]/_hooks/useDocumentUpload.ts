import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiError } from "@/types/api";

interface UploadFileResponse {
	success: boolean;
	message: string;
	data: {
		path: string;
		url: string;
	};
}

export function useDocumentUpload() {
	const { mutate, mutateAsync, isPending } = useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append("file", file);

			const response = await api.post<UploadFileResponse>(
				"/v1/uploads",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			return response.data;
		},
		onError: (err: AxiosError<ApiError>) => {
			console.log(err);
			toast.error(err?.response?.data?.message || "Failed to upload file");
		},
	});

	return { mutate, mutateAsync, isPending };
}
