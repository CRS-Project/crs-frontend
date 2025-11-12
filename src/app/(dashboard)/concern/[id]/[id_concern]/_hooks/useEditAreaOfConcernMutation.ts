import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { put } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { EditAreaOfConcernRequest } from "@/types/concern";

export const useEditAreaOfConcernMutation = ({
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
		mutationFn: async (body: EditAreaOfConcernRequest) => {
			const { Kind, OK } = await put(
				MAIN_ENDPOINT.AreaOfConcern.EditAreaOfConcern.replace(
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
		mutationKey: ["edit.area-of-concern"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["area-of-concern"] });
			toast.success("Area of Concern updated successfully!");
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(`Error updating area of concern: ${error.message}`);
		},
	});
};
