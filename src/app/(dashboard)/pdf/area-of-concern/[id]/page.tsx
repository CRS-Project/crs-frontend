"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGenerateReportConcern } from "@/app/(dashboard)/concern/[id]/[id_concern]/_hooks/useGenerateDataConcern";
import Button from "@/components/button/Button";

export default function PdfViewer() {
	const { id } = useParams();
	const router = useRouter();
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
		<div className="w-full h-[calc(100vh-5rem)] px-8">
			<Button
				leftIcon={ArrowLeft}
				size="lg"
				variant="white"
				className="sm:w-auto w-full lg:px-8 text-blue-500 font-semibold mb-[1rem]"
				onClick={() => router.back()}
			>
				Back
			</Button>
			<iframe
				src={data}
				className="w-full h-full"
				title="Area of Concern PDF"
			/>
		</div>
	);
}
