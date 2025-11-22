import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export type AocStats = {
	total_area_of_concern: number;
	total_documents: number;
	total_comments: number;
	total_comment_rejected: number;
	total_documents_without_comment: number;
};

export function useGetAocCommentCardQuery(id: string) {
	const { data, isPending, error } = useQuery<ApiResponse<AocStats>>({
		queryKey: ["aoc-comment-card", id],
		queryFn: async () => {
			const { data } = await api.get(`/v1/statistic/aoc-comment-card/${id}`);
			return data;
		},
		enabled: id !== "",
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isPending, error };
}
