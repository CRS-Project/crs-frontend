import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import type { ApiResponse } from "@/types/api";

export type Discipline = {
	id: string;
	name: string;
	initial: string;
	created_at: string;
	updated_at: string;
	DeletedAt: string | null;
};

export function useGetAllDisciplineQuery() {
	const { data, isPending } = useQuery<ApiResponse<Discipline[]>>({
		queryKey: ["disciplines"],
		queryFn: async () => {
			const response = await api.get(
				`/v1/user-discipline?sort=asc&sort_by=name`,
			);
			return response.data;
		},
	});

	return { data, isPending };
}
