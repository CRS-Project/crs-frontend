import type { Metadata } from "next";
import DocumentsTable from "./_containers/DocumentsTable";

type DocumentPageParams = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Document Details",
	description: "Document Details Page",
};

export default async function DocumentDetails({
	params,
}: {
	params: DocumentPageParams;
}) {
	await params;
	return <DocumentsTable />;
}
