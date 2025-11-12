import type { Metadata } from "next";
import ConcernDetails from "./_containers/ConcernDetails";

type DocumentPageParams = Promise<{ id: string }>;

export const metadata: Metadata = {
	title: "Area Of Concern Details",
	description: "Area Of Concern Details Page",
};

export default async function AreaOfConcernDetailPage({
	params,
}: {
	params: DocumentPageParams;
}) {
	await params;
	return <ConcernDetails />;
}
