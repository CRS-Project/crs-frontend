import { useQuery } from "@tanstack/react-query";
import { get } from "@/service/call";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGetDocument = () => {
	return useQuery({
		queryFn: async () => {
			const { Kind, OK } = await get(MAIN_ENDPOINT.Document.FetchDocuments);
			if (!OK) {
				const error = Kind as any;
				throw new Error(error.message || error.Message);
			}
			return (Kind as any).data;
		},
		queryKey: ["fetch.documents"],
	});
};
