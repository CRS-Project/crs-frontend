"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import withAuth from "@/components/hoc/withAuth";
import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layouts/AppHeader";
import AppSidebar from "@/layouts/AppSidebar";
import Backdrop from "@/layouts/Backdrop";

function AdminLayout({ children }: { children: React.ReactNode }) {
	const { isExpanded, isHovered, isMobileOpen } = useSidebar();
	const pathname = usePathname();
	const showSidebar = pathname !== "/profile";

	const mainContentMargin = isMobileOpen
		? "ml-0"
		: isExpanded || isHovered
			? "lg:ml-[279px]"
			: "lg:ml-[88px]";

	return (
		<>
			{showSidebar ? (
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
			) : (
				<div>{children}</div>
			)}
		</>
	);
}

export default withAuth(AdminLayout, "user");
