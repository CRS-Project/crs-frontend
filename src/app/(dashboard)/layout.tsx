"use client";

import type React from "react";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layouts/AppHeader";
import AppSidebar from "@/layouts/AppSidebar";
import Backdrop from "@/layouts/Backdrop";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();

	const mainContentMargin = isMobileOpen
		? "ml-0"
		: isExpanded || isHovered
			? "lg:ml-[279px]"
			: "lg:ml-[88px]";

	return (
		<div className="min-h-screen xl:flex">
			<AppSidebar />
			<Backdrop />
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
			>
				<AppHeader />
				<div className="mx-auto">{children}</div>
			</div>
		</div>
	);
}
