import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { PaginatedApiResponse } from "@/types/api";

export type Package = {
	id: string;
	name: string;
};

export function useGetAllPackageQuery() {
	const { data, isPending } = useQuery<PaginatedApiResponse<Package[]>>({
		queryKey: ["packages"],
		queryFn: async () => {
			const response = await api.get(`/v1/package?sort=asc&sort_by=name`);
			return response.data;
		},
	});

	return { data, isPending };
}
