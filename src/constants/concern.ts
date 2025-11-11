export const CONCERN_DIRECTORIES = [
	{
		id: "fpso-a-sttm",
		title: "FPSO A - STTM",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/concern/fpso-a-sttm",
	},
	{
		id: "fpso-b-ttj",
		title: "FPSO B - TTJ",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/concern/fpso-b-ttj",
	},
	{
		id: "olng-a-jt",
		title: "OLNG A - JT",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/concern/olng-a-jt",
	},
	{
		id: "olng-b-ksa",
		title: "OLNG B - KSA",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/concern/olng-b-ksa",
	},
	{
		id: "surf-worley",
		title: "SURF - Worley",
		description: "Subsea Umbilicals, Risers & Flowlines",
		linkHref: "/concern/surf-worley",
	},
	{
		id: "gep-worley",
		title: "GEP - Worley",
		description: "Gas Export Pipeline",
		linkHref: "/concern/gep-worley",
	},
] as const;

export function getConcernDirectory(id: string) {
	return CONCERN_DIRECTORIES.find((dir) => dir.id === id);
}
