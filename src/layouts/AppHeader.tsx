"use client";
import { Logs, X } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef } from "react";
import { useSidebar } from "@/context/SidebarContext";

const AppHeader: React.FC = () => {
	const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

	const handleToggle = () => {
		if (window.innerWidth >= 1024) {
			toggleSidebar();
		} else {
			toggleMobileSidebar();
		}
	};

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				inputRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<header className="sticky top-0 flex w-full bg-white border-gray-200 z-999 lg:border-b">
			<div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
				<div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
					<button
						type="button"
						className="items-center justify-center hover:bg-gray-100 flex w-10 h-10 transition-colors duration-200 cursor-pointer text-gray-500 border-gray-200 rounded-lg z-999 lg:h-11 lg:w-11 lg:border"
						onClick={handleToggle}
						aria-label="Toggle Sidebar"
					>
						{isMobileOpen ? <X /> : <Logs />}
					</button>

					<Link href="/" className="lg:hidden">
						<h1 className="font-semibold text-brand-600 text-2xl">CRS</h1>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
