import { MoveUpRight } from "lucide-react";
import DirectoryMenu from "@/components/card/DirectoryMenu";
import SummaryCard from "@/components/card/SummaryCard";
import RecapChart from "@/components/chart/RecapChart";

export default function HomePage() {
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full pt-8">
				{directoryData.map((item) => (
					<DirectoryMenu
						key={item.title}
						title={item.title}
						description={item.description}
						linkHref={item.linkHref}
						value="Area of Concern"
					/>
				))}
			</div>
		</div>
	);
}

const directoryData = [
	{
		title: "FPSO ITS",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/admin/documents/fpso-its",
	},
	{
		title: "OLNG ITS",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/admin/documents/olng-its",
	},
	{
		title: "FPSO ITB",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/admin/documents/fpso-itb",
	},
	{
		title: "OLNG ITB",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/admin/documents/olng-itb",
	},
];
