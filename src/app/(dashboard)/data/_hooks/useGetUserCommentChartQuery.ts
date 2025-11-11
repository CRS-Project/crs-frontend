import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export type UserCommentChart = {
	name: string;
	comment_closed: number;
	total_comment: number;
};

export function useGetUserCommentChartQuery(id: string) {
	const { data, isPending, error } = useQuery<ApiResponse<UserCommentChart[]>>({
		queryKey: ["user-comment-chart", id],
		queryFn: async () => {
			const { data } = await api.get(`/v1/statistic/comment-user-chart/${id}`);
			return data;
		},
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isPending, error };
}
