import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { del } from "@/service/call";

export const useDeleteDocumentMutation = ({
	onSuccess,
}: {
	onSuccess?: () => void;
} = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (document_id: string) => {
			const { Kind, OK } = await del(`/v1/document/${document_id}`);

			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}

			return Kind;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success("Document berhasil dihapus!");
			onSuccess?.();
		},
		onError: (error: Error) => {
			toast.error(`${error.message}`);
		},
	});
};
