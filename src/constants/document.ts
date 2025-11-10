export const DOCUMENT_DIRECTORIES = [
	{
		id: "fpso-its",
		title: "FPSO ITS",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-its",
	},
	{
		id: "olng-its",
		title: "OLNG ITS",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-its",
	},
	{
		id: "fpso-itb",
		title: "FPSO ITB",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-itb",
	},
	{
		id: "olng-itb",
		title: "OLNG ITB",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-itb",
	},
] as const;

export const STATUS_DOCUMENT_OPTIONS = [
	{ value: "IFR Comment", label: "IFR Comment" },
	{ value: "IFS Comment", label: "IFS Comment" },
];

export function getDocumentDirectory(id: string) {
	return DOCUMENT_DIRECTORIES.find((dir) => dir.id === id);
}
