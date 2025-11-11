import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { put } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { EditCommentRequest } from "@/types/comment";

export const useEditCommentMutation = ({
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
		mutationFn: async (body: EditCommentRequest) => {
			const { Kind, OK } = await put(
				MAIN_ENDPOINT.Comment.EditComment.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id as string,
				)
					.replace(":area_of_concern_id", area_of_concern_id as string)
					.replace(":comment_id", comment_id as string),
				body as unknown as Record<string, unknown>,
			);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["edit.comment"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["fetch.comments"] });
			toast.success("Comment edited successfully!");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error editing comment: ${error.message}`);
		},
	});
};
