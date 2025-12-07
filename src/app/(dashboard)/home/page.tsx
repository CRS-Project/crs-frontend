"use client";

import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/app/stores/useAuthStore";
import DirectoryMenu from "@/components/card/DirectoryMenu";
import SummaryCard from "@/components/card/SummaryCard";
import { useGetAocCommentCardQuery } from "../_hooks/useGetAocCommentCardQuery";
import { type Package, useGetMyPackageQuery } from "./_hooks/page";

export default function HomePage() {
	const { user } = useAuthStore();
	const { data, isPending } = useGetMyPackageQuery();
	const { data: cardData } = useGetAocCommentCardQuery(user?.package_id || "");

	const packages = data?.data || [];

	return (
		<div className="flex flex-col w-full py-4 px-4 md:px-8 md:mb-8">
			{user?.role !== "SUPER ADMIN" && (
				<div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
					<SummaryCard
						title="Total Area Of Concern"
						value={cardData?.data?.total_discipline_group || 0}
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
				</div>
			)}

			{user?.role === "SUPER ADMIN"
				? !isPending &&
					packages.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
							{packages.map((item: Package) => (
								<DirectoryMenu
									key={item.id}
									title={item.name}
									description={item.description}
									linkHref={`/concern/${item.id}`}
									value="Check Area of Concern"
								/>
							))}
						</div>
					)
				: packages.map((item: Package) => (
						<div
							className="w-full relative h-[200px] rounded-xl overflow-hidden"
							key={item.id}
						>
							<Image
								src="/images/dashboard/profile/bg-header.png"
								alt="header"
								width={3000}
								height={1000}
								className="w-full h-full object-cover -z-10"
							/>
							<div className="absolute top-4 left-8">
								<div className="text-white space-y-2">
									<h1 className="font-bold text-[64px]">{item.name}</h1>
									<p className="font-semibold text-[16px] -mt-4 mb-4">
										{item.description}
									</p>

									<Link
										href={`/concern/${item.id}`}
										className="w-full bg-white rounded-lg text-sm text-blue-600 px-4 py-2 text-center font-semibold hover:bg-gray-100 transition-all duration-200 ease-in-out"
									>
										Check Package
									</Link>
								</div>
							</div>
						</div>
					))}
		</div>
	);
}
