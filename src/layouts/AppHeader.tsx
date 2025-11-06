"use client";
import { Logs, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuthStore } from "@/hooks/useAuthStore";

const AppHeader: React.FC = () => {
	const [today, setToday] = useState("");
	const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
	const { user } = useAuthStore();

	const inputRef = useRef<HTMLInputElement>(null);

	const handleToggle = () => {
		if (window.innerWidth >= 1024) {
			toggleSidebar();
		} else {
			toggleMobileSidebar();
		}
	};

	useEffect(() => {
		const date = new Date();
		const parts = new Intl.DateTimeFormat("en-US", {
			weekday: "long",
			day: "numeric",
			month: "long",
		}).formatToParts(date);

		const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
		const dayValue = Number(parts.find((p) => p.type === "day")?.value ?? 0);
		const month = parts.find((p) => p.type === "month")?.value ?? "";

		const suffix = [11, 12, 13].includes(dayValue % 100)
			? "th"
			: ({ 1: "st", 2: "nd", 3: "rd" }[dayValue % 10] ?? "th");

		setToday(`${weekday}, ${dayValue}${suffix} ${month}`);
	}, []);

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
		<header className="sticky top-0 flex w-full bg-white border-gray-200 z-[999]">
			<div className="flex flex-col items-center justify-between grow lg:px-8 lg:py-6 lg:flex-row">
				<div className="flex items-center justify-between w-full gap-4 px-3 py-3 border-b border-gray-200 sm:gap-7 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
					<button
						type="button"
						className="items-center justify-center hover:bg-gray-100 flex w-10 h-10 transition-colors duration-200 cursor-pointer text-gray-500 border-gray-200 rounded-lg z-50 lg:h-11 lg:w-11 lg:border"
						onClick={handleToggle}
						aria-label="Toggle Sidebar"
					>
						{isMobileOpen ? <X /> : <Logs />}
					</button>
					<div className="flex w-full justify-between">
						<div className="flex flex-col justify-center lg:gap-1">
							<h3 className="text-xs lg:text-base font-semibold text-gray-500">
								{today}
							</h3>
							<h1 className="text-xl lg:text-4xl font-bold text-gray-700">
								Hello, {user?.name ?? "Super Admin ITS"}!
							</h1>
						</div>
						<Link
							className="hidden rounded-xl px-4 transition-colors duration-200 hover:bg-gray-50 sm:flex gap-2 items-center text-gray-700 text-base"
							href="/profile"
						>
							<Image
								src="/images/user.png"
								alt="User"
								width={20}
								height={20}
								className="w-12 h-12 rounded-full"
							/>
							<p>{user?.name ?? "Super Admin ITS"}</p>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
