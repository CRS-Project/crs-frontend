import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { PaginatedApiResponse } from "@/types/api";

export type Package = {
	id: string;
	name: string;
	description: string;
};

export function useGetMyPackageQuery() {
	const { data, isPending } = useQuery<PaginatedApiResponse<Package[]>>({
		queryKey: ["package-me"],
		queryFn: async () => {
			const response = await api.get(`/v1/package/me`);
			return response.data;
		},
	});

	return { data, isPending };
}
