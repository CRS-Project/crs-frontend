import type { Metadata } from "next";
import DocumentsDetails from "./_containers/DocumentsDetails";

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
	return <DocumentsDetails />;
}
