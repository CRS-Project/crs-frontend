import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetPackageById(id: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["package", id],
		queryFn: async () => {
			const { data } = await api.get(`v1/package/${id}`);
			return data;
		},
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isLoading, error };
}
