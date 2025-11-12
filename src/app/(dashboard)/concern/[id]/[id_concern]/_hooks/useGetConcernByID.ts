import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { Concern } from "@/types/concern";

interface ConcernResponse {
	data: Concern;
}

export const useGetConcernByID = (area_of_concern_group_id: string) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get<ConcernResponse>(
				MAIN_ENDPOINT.Concern.FetchConcernsById.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				).replace(":area_of_concern_id", area_of_concern_group_id),
			);
			if (!OK) {
				const error = Kind as any;
				throw new Error(
					error.message || error.Message || "Failed to fetch concern",
				);
			}
			return (Kind as ConcernResponse).data;
		},
		queryKey: ["fetch.concern", area_of_concern_group_id],
	});
};
