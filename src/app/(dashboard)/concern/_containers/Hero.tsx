"use client";

import Loading from "@/app/loading";
import DirectoryMenu from "@/components/card/DirectoryMenu";
import { useGetPackage } from "../../_hooks/useGetPackage";

export default function Hero() {
	const { data, isLoading, error } = useGetPackage();
	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-8">
				<p className="text-red-500">Failed to load packages</p>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center py-8">
				<p>No data available</p>
			</div>
		);
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 px-16 max-xl:px-6 max-xl:py-8 max-md:p-4">
			{data.data.map(
				(item: { id: string; name: string; description: string }) => (
					<DirectoryMenu
						key={item.id}
						title={item.name}
						description={item.description}
						linkHref={`/concern/${item.id}`}
						value="Check Detail Discipline Groups"
					/>
				),
			)}
		</div>
	);
}
