import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGetDocument = (packageId: string) => {
	const params = {
		filter: packageId,
		filter_by: "package_id",
	};

	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get(
				MAIN_ENDPOINT.Document.FetchDocuments,
				params,
			);
			if (!OK) {
				const error = Kind as any;
				throw new Error(error.message || error.Message);
			}
			return (Kind as any).data;
		},
		queryKey: ["fetch.documents"],
	});
};
