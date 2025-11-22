"use client";

import Image from "next/image";
import { useState } from "react";
import RecapChart from "@/app/(dashboard)/data/_components/RecapChart";
import ReviewRecapChart from "@/app/(dashboard)/data/_components/ReviewRecapChart";
import useAuthStore from "@/app/stores/useAuthStore";
import SummaryCard from "@/components/card/SummaryCard";
import { useGetAocCommentCardQuery } from "../_hooks/useGetAocCommentCardQuery";
import { type Package, useGetMyPackageQuery } from "../home/_hooks/page";
import CommentUserTable from "./_components/CommentUserTable";

export default function DataPage() {
	const { user } = useAuthStore();
	const { data } = useGetMyPackageQuery();
	const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

	const packages = data?.data[0];
	const packageId =
		user?.role === "SUPER ADMIN"
			? selectedPackage?.id || ""
			: user?.package_id || "";

	const { data: cardData } = useGetAocCommentCardQuery(packageId);

	return (
		<div className="flex flex-col w-full py-4 px-4 md:px-8">
			{user?.role === "SUPER ADMIN" && selectedPackage === null && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:mb-8">
					{data?.data?.map((item: Package) => (
						<div
							className="px-6 py-5 border rounded-lg bg-blue-600 text-white flex gap-14 flex-col justify-between"
							key={item.id}
						>
							<div>
								<h1 className="font-bold text-[64px] leading-[1]">
									{item.name}
								</h1>
								<p className="font-semibold text-[16px] mt-2">
									{item.description}
								</p>
							</div>
							<button
								type="button"
								onClick={() => setSelectedPackage(item)}
								className="w-full bg-white cursor-pointer rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out"
							>
								Check Data
							</button>
						</div>
					))}
				</div>
			)}
			{(user?.role !== "SUPER ADMIN" ||
				(user?.role === "SUPER ADMIN" && selectedPackage !== null)) && (
				<>
					<div className="w-full relative h-[210px] rounded-xl overflow-hidden">
						<Image
							src="/images/dashboard/profile/bg-header.png"
							alt="header"
							width={3000}
							height={1000}
							className="w-full h-full object-cover -z-10"
						/>
						<div className="absolute top-4 left-8">
							<div className="text-white space-y-2">
								<h1 className="font-bold text-[64px]">
									{user?.role !== "SUPER ADMIN"
										? packages?.name
										: selectedPackage?.name}
								</h1>
								<p className="font-semibold text-[16px] -mt-4 mb-4">
									{user?.role !== "SUPER ADMIN"
										? packages?.description
										: selectedPackage?.description}
								</p>
								{user?.role === "SUPER ADMIN" && (
									<button
										type="button"
										onClick={() => setSelectedPackage(null)}
										className="w-full bg-white cursor-pointer rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out"
									>
										Back to Package List
									</button>
								)}
							</div>
						</div>
					</div>
					<h1 className="font-bold text-3xl mb-2 mt-8">
						Statistics Documents & Comments
					</h1>
					<RecapChart packageId={packageId} />
					<div className="my-16 sm:my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
						<SummaryCard
							title="Total Area Of Concern"
							value={cardData?.data?.total_area_of_concern || 0}
							variant="primary"
						/>
						<SummaryCard
							title="Total Documents"
							value={cardData?.data?.total_documents || 0}
							variant="white"
						/>
						<SummaryCard
							title="Total Comments"
							value={cardData?.data?.total_comments || 0}
							variant="white"
						/>
						<SummaryCard
							title="Total Comment Rejected"
							value={cardData?.data?.total_comment_rejected || 0}
							variant="white"
						/>
						<SummaryCard
							title="Total Document Without Comments"
							value={cardData?.data?.total_documents_without_comment || 0}
							variant="white"
						/>
					</div>
					<h1 className="font-bold text-3xl mb-2">Statistics Comment Users</h1>
					<ReviewRecapChart packageId={packageId} />
					<CommentUserTable packageId={packageId} />
				</>
			)}
		</div>
	);
}
