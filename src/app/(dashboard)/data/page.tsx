import { MoveUpRight } from "lucide-react";
import SummaryCard from "@/components/card/SummaryCard";
import RecapChart from "@/components/chart/RecapChart";

export default function DataPage() {
	return (
		<div className="flex flex-col w-full py-4 px-4 md:px-8">
			<h1 className="font-bold text-3xl">Statistics Documents & Comments</h1>
			<RecapChart />
			<div className="my-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 justify-center">
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
				<SummaryCard
					title="Percentage Docs Availability"
					value="70%"
					variant="white"
					icon={MoveUpRight}
				/>
				<SummaryCard
					title="Percentage Reviewed Docs"
					value="27%"
					variant="white"
					icon={MoveUpRight}
				/>
				<SummaryCard
					title="Comment Closed"
					value="214"
					variant="white"
					icon={MoveUpRight}
				/>
			</div>
			<h1 className="font-bold text-3xl">Statistics Comment Users</h1>
		</div>
	);
}
