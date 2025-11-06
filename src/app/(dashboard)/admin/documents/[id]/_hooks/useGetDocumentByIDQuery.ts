import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";

export function useGetDocumentByIDQuery(id: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["document", id],
		queryFn: async () => {
			if (!id) return null;
			const { data } = await api.get(`v1/document/${id}`);
			return data;
		},
		enabled: !!id && id.trim() !== "",
	});

	return { data, isLoading, error };
}
