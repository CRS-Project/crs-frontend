import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetConcernByIDQuery(id: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["concern", id],
		queryFn: async () => {
			if (!id) return null;
			const { data } = await api.get(`v1/area-of-concern-group/${id}`);
			return data;
		},
		enabled: !!id && id.trim() !== "",
		staleTime: 0,
	});

	return { data, isLoading, error };
}
