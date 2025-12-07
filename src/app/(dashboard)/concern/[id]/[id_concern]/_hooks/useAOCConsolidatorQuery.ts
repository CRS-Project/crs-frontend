import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { ConsolidatorSelectOption } from "@/types/consolidator";

export const useGetAOCConsolidatorOption = (id: string) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get<ConsolidatorSelectOption>(
				MAIN_ENDPOINT.AreaOfConcern.GetConsolidators.replace(
					":area_of_concern_group_id",
					id,
				),
			);
			if (!OK) {
				const error = Kind as any;
				throw new Error(
					error.message || error.Message || "Failed to fetch consolidator",
				);
			}
			const user = (Kind as any).data;
			return {
				user: user.map((item: any) => ({
					value: item.discipline_group_consolidator_id,
					label: item.name,
				})),
			};
		},
		queryKey: ["fetch.consolidators", id],
	});
};
