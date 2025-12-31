import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/service/api";

interface useDeleteDocumentMutationProps {
	onSuccess?: () => void;
}

export function useDeleteDocumentMutation({
	onSuccess,
}: useDeleteDocumentMutationProps = {}) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: string) => {
			return await api.delete(`/v1/document/${id}`);
		},
		onSuccess: () => {
			toast.success(`Document berhasil dihapus!`);
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			if (onSuccess) onSuccess();
		},
		onError: (err: any) => {
			const apiMessage =
				err?.response?.data?.error || err?.response?.data?.message;
			const message = apiMessage || err?.message || "Gagal menghapus dokumen";
			toast.error(message);
		},
	});

	return { mutate, isPending };
}
