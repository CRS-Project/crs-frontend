import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/service/api";

interface useDeleteUserMutationProps {
	onSuccess?: () => void;
}

export function useDeleteUserMutation({
	onSuccess,
}: useDeleteUserMutationProps = {}) {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (id: string) => {
			return await api.delete(`/v1/user/${id}`);
		},
		onSuccess: () => {
			toast.success(`User berhasil dihapus!`);
			queryClient.invalidateQueries({ queryKey: ["users"] });
			if (onSuccess) onSuccess();
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return { mutate, isPending };
}
