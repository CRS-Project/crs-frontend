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

const data = [
	{ name: "MA", docs: 35, closed: 19 },
	{ name: "TQ", docs: 64, closed: 9 },
	{ name: "FI", docs: 36, closed: 10 },
	{ name: "RS", docs: 49, closed: 7 },
	{ name: "AW", docs: 37, closed: 5 },
	{ name: "DV", docs: 2, closed: 0 },
	{ name: "AD", docs: 2, closed: 0 },
	{ name: "AD", docs: 3, closed: 3 },
	{ name: "SJ", docs: 4, closed: 3 },
	{ name: "AN", docs: 4, closed: 1 },
	{ name: "FU", docs: 7, closed: 1 },
	{ name: "KP", docs: 0, closed: 0 },
	{ name: "GS", docs: 7, closed: 1 },
	{ name: "RK", docs: 0, closed: 0 },
];

export default function ReviewRecapChart() {
	return (
		<div className="w-full">
			{/* <h2
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        REVIEW RECAP PER SME AS PER 27 NOV 2024
      </h2> */}

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

					{/* ✅ COMMENTS dulu di legend */}
					<Bar dataKey="docs" name="COMMENTS" fill="#1E88E5" barSize={35} />

					{/* ✅ CLOSED setelahnya */}
					<Bar dataKey="closed" name="CLOSED" fill="#FB8C00" barSize={35} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
