import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetPackage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["package"],
		queryFn: async () => {
			const { data } = await api.get(`v1/package/me`);
			return data;
		},
		staleTime: 5 * 1024 * 1024,
	});

	return { data, isLoading, error };
}
