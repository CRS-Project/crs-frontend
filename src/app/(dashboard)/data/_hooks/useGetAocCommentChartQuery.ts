import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export type AocCommentChart = {
	name: string;
	total_discipline_list_document: number;
	total_documents: number;
	total_comments: number;
	total_comment_rejected: number;
};

export function useGetAocCommentChartQuery(id: string) {
	const { data, isPending, error } = useQuery<ApiResponse<AocCommentChart[]>>({
		queryKey: ["aoc-comment-chart", id],
		queryFn: async () => {
			const { data } = await api.get(`/v1/statistic/aoc-comment-chart/${id}`);
			return data;
		},
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isPending, error };
}
