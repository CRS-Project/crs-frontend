import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export const useUploadFileMutation = (id: string, label?: string) => {
	return useMutation({
		mutationFn: async (file: File) => {
			const formData = new FormData();
			formData.append("file_type", id);
			formData.append("file", file);

			const response = await api.post<
				ApiResponse<{ path: string; url: string }>
			>("/v1/uploads", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			return response.data;
		},
		onSuccess: (_response) => {
			toast.success(`File ${label ?? ""} berhasil diunggah!`);
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
