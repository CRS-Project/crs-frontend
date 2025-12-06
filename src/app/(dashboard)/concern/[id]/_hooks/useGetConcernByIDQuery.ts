import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetConcernByIDQuery(id: string, enabled = true) {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["concern", id],
		queryFn: async () => {
			if (!id) return null;
			const { data } = await api.get(`v1/discipline-group/${id}`);
			return data;
		},
		enabled: enabled && !!id && id.trim() !== "",
		staleTime: 0,
		refetchOnMount: true,
	});

	return { data, isLoading, error, refetch };
}
