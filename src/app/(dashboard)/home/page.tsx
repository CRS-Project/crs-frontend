"use client";

import { MoveLeft, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/app/stores/useAuthStore";
import DirectoryMenu from "@/components/card/DirectoryMenu";
import SummaryCard from "@/components/card/SummaryCard";
import RecapChart from "@/components/chart/RecapChart";
import { type Package, useGetMyPackageQuery } from "./_hooks/page";

export default function HomePage() {
	const { user } = useAuthStore();
	const { data, isPending } = useGetMyPackageQuery();

	const packages = data?.data || [];

	return (
		<div className="flex flex-col w-full py-4 px-4 md:px-8">
			<div className="flex flex-col lg:flex-row">
				<div className="flex flex-col gap-2 items-center sm:items-start">
					<SummaryCard
						title="Total Documents"
						value="531"
						variant="primary"
						icon={MoveUpRight}
					/>
					<SummaryCard
						title="Total Comments"
						value="832"
						variant="white"
						icon={MoveUpRight}
					/>
					<SummaryCard
						title="Total Reviewed Docs"
						value="256"
						variant="white"
						icon={MoveUpRight}
					/>
				</div>
				<RecapChart />
			</div>

			{user?.role === "SUPER ADMIN"
				? !isPending &&
					packages.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-8">
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
