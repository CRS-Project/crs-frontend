import type { Metadata } from "next";
import DirectoryMenu from "@/components/card/DirectoryMenu";
import { DOCUMENT_DIRECTORIES } from "@/constants/document";

export const metadata: Metadata = {
	title: "Document Page",
	description: "Document Page",
};

export default function AdminDocumentPage() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 px-16 max-xl:px-6 max-xl:py-8 max-md:p-4">
			{DOCUMENT_DIRECTORIES.map((item) => (
				<DirectoryMenu
					key={item.title}
					title={item.title}
					description={item.description}
					linkHref={item.linkHref}
					value="Check Documents"
				/>
			))}
		</div>
	);
}
