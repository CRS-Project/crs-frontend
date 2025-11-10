import type { Metadata } from "next";
import DirectoryMenu from "@/components/card/DirectoryMenu";

export const metadata: Metadata = {
	title: "Document Page",
	description: "Document Page",
};

export default function AdminDocumentPage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 px-16 max-xl:px-6 max-xl:py-8 max-md:p-4">
			{directoryData.map((item) => (
				<DirectoryMenu
					key={item.title}
					title={item.title}
					description={item.description}
					linkHref={item.linkHref}
				/>
			))}
		</div>
	);
}

const directoryData = [
	{
		title: "FPSO ITS",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-its",
	},
	{
		title: "OLNG ITS",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-its",
	},
	{
		title: "FPSO ITB",
		description: "Floating Production, Storage, and Offloading",
		linkHref: "/documents/fpso-itb",
	},
	{
		title: "OLNG ITB",
		description: "Onshore LNG (Liquefied Natural Gas)",
		linkHref: "/documents/olng-itb",
	},
];
