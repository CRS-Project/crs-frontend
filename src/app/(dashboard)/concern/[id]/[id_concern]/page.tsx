import type { Metadata } from "next";
import ConcernDetails from "./_containers/ConcernDetails";

type DocumentPageParams = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Document List",
	description: "Document List Page",
};

export default async function AreaOfConcernDetailPage({
	params,
}: {
	params: DocumentPageParams;
}) {
	await params;
	return <ConcernDetails />;
}
