import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { Comment } from "@/types/comment";

interface CommentResponse {
	data: Comment[];
}

export const useFetchComments = (
	area_of_concern_group_id: string,
	area_of_concern_id: string,
) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get<CommentResponse>(
				MAIN_ENDPOINT.Comment.FetchComments.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				).replace(":area_of_concern_id", area_of_concern_id),
			);
			if (!OK) {
				const error = Kind as any;
				throw new Error(
					error.message || error.Message || "Failed to fetch comments",
				);
			}
			return (Kind as CommentResponse).data;
		},
		queryKey: ["fetch.comments", area_of_concern_group_id, area_of_concern_id],
	});
};
