import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";
import type { ConsolidatorSelectOption } from "@/types/consolidator";

export const useGetConsolidatorOption = (id: string) => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get<ConsolidatorSelectOption>(
				MAIN_ENDPOINT.User.FetchUsersByPackageAndRole.replace(":id", id),
			);
			if (!OK) {
				const error = Kind as any;
				throw new Error(
					error.message || error.Message || "Failed to fetch comments",
				);
			}
			const user = (Kind as any).data;
			return {
				user: user.map((item: any) => ({
					value: item.id,
					label: item.name,
				})),
			};
		},
		queryKey: ["fetch.user", id],
	});
};
