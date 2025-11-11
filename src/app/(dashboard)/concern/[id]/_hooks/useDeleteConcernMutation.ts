import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/service/api";

interface useDeleteConcernMutationProps {
	onSuccess?: () => void;
}

export function useDeleteConcernMutation({
	onSuccess,
}: useDeleteConcernMutationProps = {}) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: string) => {
			return await api.delete(`/v1/area-of-concern-group/${id}`);
		},
		onSuccess: () => {
			toast.success(`Concern berhasil dihapus!`);
			queryClient.invalidateQueries({ queryKey: ["concern"] });
			if (onSuccess) onSuccess();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { mutate, isPending };
}
