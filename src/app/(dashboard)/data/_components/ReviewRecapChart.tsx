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
import { useGetUserCommentChartQuery } from "@/app/(dashboard)/data/_hooks/useGetUserCommentChartQuery";

export default function ReviewRecapChart({ packageId }: { packageId: string }) {
	const { data: chartData } = useGetUserCommentChartQuery(packageId);

	const data = chartData?.data || [];

	return (
		<div className="w-full">
			<ResponsiveContainer width="100%" height={400}>
				<BarChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />

					<Bar
						dataKey="total_comment"
						name="COMMENTS"
						fill="#1E88E5"
						barSize={35}
					/>

					<Bar
						dataKey="comment_closed"
						name="CLOSED"
						fill="#FB8C00"
						barSize={35}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
