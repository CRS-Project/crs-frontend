import type { Metadata } from "next";
import type { DocumentPageParams } from "@/types/document";
import DocumentsTable from "./_containers/DocumentsTable";

export const metadata: Metadata = {
	title: "Document Details",
	description: "Document Details Page",
};

export default async function DocumentDetailsPage({
	params,
}: {
	params: DocumentPageParams;
}) {
	const { id } = await params;
	return <DocumentsTable id={id} />;
}
