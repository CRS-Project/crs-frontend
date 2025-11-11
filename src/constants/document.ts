export const DOCUMENT_DIRECTORIES = [
	{
		id: "fpso-a-sttm",
		title: "FPSO A - STTM",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-a-sttm",
	},
	{
		id: "fpso-b-ttj",
		title: "FPSO B - TTJ",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-b-ttj",
	},
	{
		id: "olng-a-jt",
		title: "OLNG A - JT",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-a-jt",
	},
	{
		id: "olng-b-ksa",
		title: "OLNG B - KSA",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-b-ksa",
	},
	{
		id: "surf-worley",
		title: "SURF - Worley",
		description: "Subsea Umbilicals, Risers & Flowlines",
		linkHref: "/documents/surf-worley",
	},
	{
		id: "gep-worley",
		title: "GEP - Worley",
		description: "Gas Export Pipeline",
		linkHref: "/documents/gep-worley",
	},
] as const;

export const STATUS_DOCUMENT_OPTIONS = [
	{ value: "IFR Comment", label: "IFR Comment" },
	{ value: "IFS Comment", label: "IFS Comment" },
];

export function getDocumentDirectory(id: string) {
	return DOCUMENT_DIRECTORIES.find((dir) => dir.id === id);
}
