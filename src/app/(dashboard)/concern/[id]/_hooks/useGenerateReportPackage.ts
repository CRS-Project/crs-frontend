import { useQuery } from "@tanstack/react-query";
import api from "@/service/api";
import { MAIN_ENDPOINT } from "@/service/endpoint";

export const useGenerateReportPackage = (package_id: string) => {
	return useQuery({
		queryFn: async () => {
			const response = await api.get(
				MAIN_ENDPOINT.Package.GeneratePdf.replace(":package_id", package_id),
				{
					responseType: "blob",
				},
			);

			const blob = new Blob([response.data], { type: "application/pdf" });
			return URL.createObjectURL(blob);
		},
		queryKey: ["fetch.pdf", package_id],
	});
};
