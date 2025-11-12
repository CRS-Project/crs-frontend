import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGenerateReportConcern = (area_of_concern_group_id: string) => {
	return useQuery({
		queryFn: async () => {
			const response = await api.get(
				MAIN_ENDPOINT.AreaOfConcern.GeneratePdf.replace(
					":area_of_concern_group_id",
					area_of_concern_group_id,
				),
				{
					responseType: "blob",
				},
			);

			const blob = new Blob([response.data], { type: "application/pdf" });
			return URL.createObjectURL(blob);
		},
		queryKey: ["fetch.pdf", area_of_concern_group_id],
	});
};
