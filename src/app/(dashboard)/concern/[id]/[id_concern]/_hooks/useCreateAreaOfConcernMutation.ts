import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { post } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { CreateAreaOfConcernRequest } from "@/types/concern";

export const useCreateAreaOfConcernMutation = ({
	area_of_concern_group_id,
	onSuccess,
}: {
	area_of_concern_group_id: string;
	onSuccess: () => void;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (body: CreateAreaOfConcernRequest) => {
			const { Kind, OK } = await post(
				MAIN_ENDPOINT.AreaOfConcern.CreateAreaOfConcern.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				),
				body as unknown as Record<string, unknown>,
			);
			if (!OK) {
				throw new Error((Kind as { error: string }).error);
			}
			return Kind;
		},
		mutationKey: ["create.area.of.concern", area_of_concern_group_id],
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["area-of-concern", area_of_concern_group_id],
			});
			toast.success("Area of concern created successfully");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error creating area of concern: ${error.message}`);
		},
	});
};
