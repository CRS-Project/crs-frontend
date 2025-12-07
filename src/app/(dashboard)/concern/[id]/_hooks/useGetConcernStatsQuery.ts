import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export type ConcernStats = {
	total_discipline_group: number;
	total_discipline_list_document: number;
	total_comment: number;
};

export function useGetConcernStatsQuery(id: string) {
	const { data, isPending, error } = useQuery<ApiResponse<ConcernStats>>({
		queryKey: ["concern-stats", id],
		queryFn: async () => {
			const { data } = await api.get(`/v1/discipline-group/statistic/${id}`);
			return data;
		},
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isPending, error };
}
