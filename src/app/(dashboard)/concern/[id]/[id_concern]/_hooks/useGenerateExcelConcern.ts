import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGenerateExcelConcern = (area_of_concern_group_id: string) => {
	return useQuery({
		queryFn: async () => {
			const response = await api.get(
				MAIN_ENDPOINT.AreaOfConcern.GenerateExcel.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				),
				{ responseType: "blob" },
			);

			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			return URL.createObjectURL(blob);
		},
		queryKey: ["fetch.excel", area_of_concern_group_id],
		enabled: !!area_of_concern_group_id,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
	});
};
