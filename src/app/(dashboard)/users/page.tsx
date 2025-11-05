import type { Metadata } from "next";
import UsersTable from "./_containers/UsersTable";

export const metadata: Metadata = {
	title: "User Dashboard",
	description: "User Dashboard Page",
};

export default function UsersDashboardPage() {
	return <UsersTable />;
}
