import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGenerateExcelDocument = (
	area_of_concern_group_id: string,
	area_of_concern_id: string,
) => {
	return useQuery({
		queryFn: async () => {
			const response = await api.get(
				MAIN_ENDPOINT.AreaOfConcern.GenerateExcelListDocument.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				).replace(":area_of_concern_id", area_of_concern_id),
				{ responseType: "blob" },
			);

			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			return URL.createObjectURL(blob);
		},
		queryKey: [
			"fetch.excel.list.document",
			area_of_concern_group_id,
			area_of_concern_id,
		],
		enabled: !!area_of_concern_group_id && !!area_of_concern_id,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
	});
};
