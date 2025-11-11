"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useGetAocCommentChartQuery } from "@/app/(dashboard)/data/_hooks/useGetAocCommentChartQuery";

export default function RecapChart({ packageId }: { packageId: string }) {
	const { data: graphData } = useGetAocCommentChartQuery(packageId);

	const data = graphData?.data ?? [];

	return (
		<div className="w-full">
			<div style={{ width: "100%", height: 520 }}>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						margin={{ top: 20, right: 60, left: 20, bottom: 20 }}
						barGap={30} // jarak antar bar dalam satu grup
						barCategoryGap="40%" // jarak antar grup bar
					>
						<CartesianGrid
							stroke="#e6eef8"
							strokeDasharray="4 4"
							vertical={false}
						/>

						<XAxis dataKey="name" />
						<YAxis />

						<Tooltip />
						<Legend verticalAlign="bottom" height={36} />

						<Bar
							dataKey="total_area_of_concern"
							name="Area of Concern"
							fill="#64B5F6"
							barSize={20}
						/>
						<Bar
							dataKey="total_documents"
							name="Total Documents"
							fill="#1E88E5"
							barSize={20}
						/>
						<Bar
							dataKey="total_comments"
							name="Total Comments"
							fill="#90A4AE"
							barSize={20}
						/>
						<Bar
							dataKey="total_comment_rejected"
							name="Rejected Comments"
							fill="#1565C0"
							barSize={20}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
