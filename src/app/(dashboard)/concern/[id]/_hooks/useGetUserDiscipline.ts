import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetUserDiscipline() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["concern"],
		queryFn: async () => {
			const { data } = await api.get(`v1/user-discipline`);
			return data;
		},
		staleTime: 0,
	});

	return { data, isLoading, error };
}
