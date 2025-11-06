"use client";

import {
	Bar,
	CartesianGrid,
	ComposedChart,
	Legend,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// Blue palette
const colors = {
	mainBlue: "#1E88E5", // Main bright blue
	softBlue: "#64B5F6", // Soft light blue
	deepBlue: "#0D47A1", // Dark navy blue
	mediumBlue: "#1565C0", // Medium dark blue
	grayBlue: "#90A4AE", // Grayish blue for comments
};

const data = [
	{
		date: "31-Oct",
		uploaded: 153,
		reviewed: 318,
		comments: 252,
		pctAvailable: 31,
		pctReviewed: 18,
	},
	{
		date: "07-Nov",
		uploaded: 185,
		reviewed: 308,
		comments: 308,
		pctAvailable: 34,
		pctReviewed: 20,
	},
	{
		date: "13-Nov",
		uploaded: 196,
		reviewed: 331,
		comments: 331,
		pctAvailable: 35,
		pctReviewed: 22,
	},
	{
		date: "15-Nov",
		uploaded: 227,
		reviewed: 349,
		comments: 393,
		pctAvailable: 39,
		pctReviewed: 25,
	},
	{
		date: "19-Nov",
		uploaded: 252,
		reviewed: 436,
		comments: 449,
		pctAvailable: 44,
		pctReviewed: 28,
	},
	{
		date: "23-Nov",
		uploaded: 284,
		reviewed: 487,
		comments: 511,
		pctAvailable: 48,
		pctReviewed: 30,
	},
	{
		date: "25-Nov",
		uploaded: 294,
		reviewed: 777,
		comments: 515,
		pctAvailable: 70,
		pctReviewed: 38,
	},
	{
		date: "27-Nov",
		uploaded: 297,
		reviewed: 777,
		comments: 515,
		pctAvailable: 70,
		pctReviewed: 40,
	},
];

export default function RecapChart() {
	return (
		<ResponsiveContainer width="100%" height={600} className="w-full h-auto">
			<ComposedChart data={data} margin={{ top: 30, right: 50, left: 20 }}>
				{/* GRID */}
				<CartesianGrid stroke="#E3F2FD" strokeDasharray="3 3" />

				<XAxis dataKey="date" tick={{ fill: colors.deepBlue }} />
				<YAxis yAxisId="left" tick={{ fill: colors.deepBlue }} />
				<YAxis
					yAxisId="right"
					orientation="right"
					stroke={colors.mediumBlue}
					tick={{ fill: colors.mediumBlue }}
					tickFormatter={(v: number | string) => `${v}%`}
				/>

				<Tooltip />
				<Legend />

				{/* BAR CHARTS */}
				<Bar
					yAxisId="left"
					dataKey="uploaded"
					name="Total Uploaded Docs"
					fill={colors.mainBlue}
				/>
				<Bar
					yAxisId="left"
					dataKey="reviewed"
					name="Total Reviewed Docs"
					fill={colors.softBlue}
				/>
				<Bar
					yAxisId="left"
					dataKey="comments"
					name="Total Comments"
					fill={colors.grayBlue}
				/>

				{/* LINE CHARTS */}
				<Line
					yAxisId="right"
					type="monotone"
					dataKey="pctAvailable"
					name="Percentage Docs Availability"
					stroke={colors.mediumBlue}
					strokeWidth={3}
					dot={{ r: 4, fill: colors.mediumBlue }}
				/>

				<Line
					yAxisId="right"
					type="monotone"
					dataKey="pctReviewed"
					name="Percentage Reviewed Docs"
					stroke={colors.deepBlue}
					strokeWidth={3}
					dot={{ r: 4, fill: colors.deepBlue }}
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
}
