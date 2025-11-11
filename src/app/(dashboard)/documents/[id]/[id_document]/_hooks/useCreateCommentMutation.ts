import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { post } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { CreateCommentRequest } from "@/types/comment";

export const useCreateCommentMutation = ({
	area_of_concern_group_id,
	area_of_concern_id,
	onSuccess,
}: {
	area_of_concern_group_id: string;
	area_of_concern_id: string;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (body: CreateCommentRequest) => {
			const { Kind, OK } = await post(
				MAIN_ENDPOINT.Comment.CreateComment.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id as string,
				).replace(":area_of_concern_id", area_of_concern_id as string),
				body as unknown as Record<string, unknown>,
			);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["create.comment"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["fetch.comments"] });
			toast.success("Comment created successfully!");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error creating comment: ${error.message}`);
		},
	});
};
