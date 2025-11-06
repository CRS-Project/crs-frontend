import { MoveUpRight } from "lucide-react";
import SummaryCard from "@/components/card/SummaryCard";
import RecapChart from "@/components/chart/RecapChart";

export default function HomePage() {
	return (
		<div className="flex flex-col lg:flex-row w-full py-4 px-4 md:px-8">
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
	);
}
