import type { Metadata } from "next";
import Hero from "./_containers/Hero";

export const metadata: Metadata = {
	title: "Concern Page",
	description: "Concern Page",
};

export default function AdminConcernPage() {
	return <Hero />;
}
