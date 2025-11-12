import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { post } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { CreateReplyRequest } from "@/types/comment";

export const useCreateReplyMutation = ({
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
		mutationFn: async (body: CreateReplyRequest) => {
			const { Kind, OK } = await post(
				MAIN_ENDPOINT.Comment.CreateReply.replace(
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
			toast.success("Reply created successfully!");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error replying comment: ${error.message}`);
		},
	});
};
