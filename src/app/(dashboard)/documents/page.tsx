import type { Metadata } from "next";
import Hero from "./_containers/Hero";

export const metadata: Metadata = {
	title: "Document Page",
	description: "Document Page",
};

export default function AdminDocumentPage() {
	return <Hero />;
}
