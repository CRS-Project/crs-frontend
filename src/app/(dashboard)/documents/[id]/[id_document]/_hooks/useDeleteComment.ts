import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { del } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useDeleteCommentMutation = ({
	area_of_concern_group_id,
	area_of_concern_id,
	comment_id,
	onSuccess,
}: {
	area_of_concern_group_id: string;
	area_of_concern_id: string;
	comment_id: string;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const { Kind, OK } = await del(
				MAIN_ENDPOINT.Comment.DeleteComment.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id as string,
				)
					.replace(":area_of_concern_id", area_of_concern_id as string)
					.replace(":comment_id", comment_id as string),
			);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["fetch.comments"] });
			toast.success("Comment deleted successfully!");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error deleting comment: ${error.message}`);
		},
	});
};
