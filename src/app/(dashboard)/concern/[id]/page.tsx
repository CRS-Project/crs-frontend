import type { Metadata } from "next";
import type { ConcernPageParams } from "@/types/concern";
import ConcernTable from "./_containers/ConcernTable";

export const metadata: Metadata = {
	title: "Discipline Group",
	description: "Discipline Groups Page",
};

export default async function ConcernDetailsPage({
	params,
}: {
	params: ConcernPageParams;
}) {
	const { id } = await params;
	return <ConcernTable id={id} />;
}
