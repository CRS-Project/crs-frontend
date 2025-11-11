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
	{
		name: "31-Oct",
		areaConcern: 531,
		totalDocs: 256,
		totalComments: 832,
		rejected: 214,
	},
	{
		name: "02-Nov",
		areaConcern: 540,
		totalDocs: 270,
		totalComments: 860,
		rejected: 220,
	},
	{
		name: "04-Nov",
		areaConcern: 553,
		totalDocs: 284,
		totalComments: 880,
		rejected: 230,
	},
	{
		name: "07-Nov",
		areaConcern: 560,
		totalDocs: 300,
		totalComments: 900,
		rejected: 250,
	},
	{
		name: "10-Nov",
		areaConcern: 575,
		totalDocs: 310,
		totalComments: 920,
		rejected: 260,
	},
	{
		name: "13-Nov",
		areaConcern: 590,
		totalDocs: 320,
		totalComments: 950,
		rejected: 270,
	},
	{
		name: "16-Nov",
		areaConcern: 603,
		totalDocs: 330,
		totalComments: 960,
		rejected: 275,
	},
	{
		name: "19-Nov",
		areaConcern: 620,
		totalDocs: 340,
		totalComments: 980,
		rejected: 290,
	},
	{
		name: "23-Nov",
		areaConcern: 631,
		totalDocs: 356,
		totalComments: 1002,
		rejected: 310,
	},
	{
		name: "27-Nov",
		areaConcern: 645,
		totalDocs: 370,
		totalComments: 1025,
		rejected: 325,
	},
];

export default function RecapChart() {
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
							dataKey="areaConcern"
							name="Area of Concern"
							fill="#64B5F6"
							barSize={20}
						/>
						<Bar
							dataKey="totalDocs"
							name="Total Documents"
							fill="#1E88E5"
							barSize={20}
						/>
						<Bar
							dataKey="totalComments"
							name="Total Comments"
							fill="#90A4AE"
							barSize={20}
						/>
						<Bar
							dataKey="rejected"
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
