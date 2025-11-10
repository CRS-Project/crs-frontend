import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetPackageId(search: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["package"],
		queryFn: async () => {
			const { data } = await api.get(`v1/package`, {
				params: {
					filter: search,
					filter_by: "name",
				},
			});
			return data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	return { data, isLoading, error };
}
