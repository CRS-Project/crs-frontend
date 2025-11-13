"use client";

import type React from "react";
import withAuth from "@/components/hoc/withAuth";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layouts/AppHeader";
import AppSidebar from "@/layouts/AppSidebar";
import Backdrop from "@/layouts/Backdrop";

function ProfileLayout({ children }: { children: React.ReactNode }) {
	const { isMobileOpen } = useSidebar();

	// Only apply margin on mobile when sidebar is closed
	const mainContentMargin = isMobileOpen ? "ml-0" : "ml-0";

	return (
		<div className="min-h-screen xl:flex">
			<div className="md:hidden">
				<AppSidebar />
			</div>
			<Backdrop />
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
			>
				<div className="md:hidden">
					<AppHeader />
				</div>
				<div className="mx-auto">{children}</div>
			</div>
		</div>
	);
}

export default withAuth(ProfileLayout, "user");
