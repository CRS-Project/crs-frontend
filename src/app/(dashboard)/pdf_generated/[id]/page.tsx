"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useGenerateReportConcern } from "../../concern/[id]/[id_concern]/_hooks/useGenerateDataConcern";

export default function PdfViewer() {
	const { id } = useParams();
	const { data, isLoading, isError } = useGenerateReportConcern(id as string);

	useEffect(() => {
		return () => {
			if (data) {
				URL.revokeObjectURL(data);
			}
		};
	}, [data]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading PDF...</p>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center text-red-500">
					<p>Failed to load PDF. Please try again.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-screen">
			<iframe
				src={data}
				className="w-full h-full"
				title="Area of Concern PDF"
			/>
		</div>
	);
}
