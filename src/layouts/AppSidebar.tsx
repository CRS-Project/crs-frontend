"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import Data from "../../public/images/sidebar/data.svg";
import Documents from "../../public/images/sidebar/documents.svg";
import Home from "../../public/images/sidebar/home.svg";
import Users from "../../public/images/sidebar/users.svg";

type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: { name: string; path: string }[];
};

const AppSidebar: React.FC = () => {
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
	const pathname = usePathname();

	const navItems: NavItem[] = useMemo(
		() => [
			{
				icon: <Home className="w-full h-full" />,
				name: "Home",
				path: "/",
			},
			{
				icon: <Data className="w-full h-full" />,
				name: "Data",
				path: "/data",
			},
			{
				icon: <Documents className="w-full h-full" />,
				name: "Documents",
				path: "/documents",
			},
			{
				icon: <Users className="w-full h-full" />,
				name: "Users",
				path: "/users",
			},
		],
		[],
	);

	const filterNavItems = (role: string) => {
		switch (role) {
			case "superAdmin":
				return navItems;
			case "admin":
				return navItems.filter(
					(link) =>
						link.name === "Dashboard" ||
						link.name === "Profile" ||
						link.name === "Purchase Order" ||
						link.name === "Delivery Order" ||
						link.name === "Customer Management" ||
						link.name === "Product Specification",
				);
			case "sales":
				return navItems.filter(
					(link) =>
						link.name === "Dashboard" ||
						link.name === "Profile" ||
						link.name === "Product Specification",
				);
			default:
				return [];
		}
	};

	const filteredNavItems = filterNavItems("superAdmin");

	const renderMenuItems = (
		navItems: NavItem[],
		menuType: "main" | "others",
	) => (
		<ul className="flex flex-col gap-2">
			{navItems.map((nav, index) => (
				<li key={nav.name}>
					{nav.subItems ? (
						<button
							type="button"
							onClick={() => handleSubmenuToggle(index, menuType)}
							className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm group ${
								openSubmenu?.type === menuType && openSubmenu?.index === index
									? "bg-brand-50 text-brand-500"
									: "text-gray-700 hover:bg-gray-100 group-hover:text-gray-700"
							} cursor-pointer ${
								!isExpanded && !isHovered
									? "lg:justify-center"
									: "lg:justify-start"
							}`}
						>
							<span
								className={` ${
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? "text-brand-500 "
										: "text-gray-500 group-hover:text-gray-700 "
								}`}
							>
								{nav.icon}
							</span>
							{(isExpanded || isHovered || isMobileOpen) && (
								<span className={`menu-item-text`}>{nav.name}</span>
							)}
							{(isExpanded || isHovered || isMobileOpen) && (
								<ChevronDown
									className={`ml-auto w-5 h-5 transition-transform duration-200  ${
										openSubmenu?.type === menuType &&
										openSubmenu?.index === index
											? "rotate-180 text-brand-500"
											: ""
									}`}
								/>
							)}
						</button>
					) : (
						nav.path && (
							<Link
								href={nav.path}
								className={`relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm group ${
									isActive(nav.path)
										? "bg-primary-1000 text-white"
										: "text-secondary-1000 hover:bg-gray-100 group-hover:text-gray-700"
								}`}
							>
								<span
									className={`${
										isActive(nav.path)
											? "text-brand-500 "
											: "text-secondary-1000 group-hover:text-gray-700"
									}`}
								>
									{nav.icon}
								</span>
								{(isExpanded || isHovered || isMobileOpen) && (
									<span
										className={`menu-item-text ${
											isActive(nav.path)
												? "group-hover:text-white"
												: "group-hover:text-gray-700"
										}`}
									>
										{nav.name}
									</span>
								)}
							</Link>
						)
					)}
					{nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
						<div
							ref={(el) => {
								subMenuRefs.current[`${menuType}-${index}`] = el;
							}}
							className="overflow-hidden transition-all duration-300"
							style={{
								height:
									openSubmenu?.type === menuType && openSubmenu?.index === index
										? `${subMenuHeight[`${menuType}-${index}`]}px`
										: "0px",
							}}
						>
							<ul className="mt-2 space-y-1 ml-9">
								{nav.subItems.map((subItem) => (
									<li key={subItem.name}>
										<Link
											href={subItem.path}
											className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-theme-sm font-medium ${
												isActive(subItem.path)
													? "bg-brand-50 text-brand-500 "
													: "text-gray-700 hover:bg-gray-100"
											}`}
										>
											{subItem.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</li>
			))}
		</ul>
	);

	const [openSubmenu, setOpenSubmenu] = useState<{
		type: "main" | "others";
		index: number;
	} | null>(null);
	const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
		{},
	);
	const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const isActive = useCallback((path: string) => path === pathname, [pathname]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: "Intentional"
	useEffect(() => {
		let submenuMatched = false;
		["main"].forEach((menuType) => {
			const items = menuType === "main" ? navItems : navItems;
			items.forEach((nav: NavItem, index: number) => {
				if (nav.subItems) {
					nav.subItems.forEach((subItem) => {
						if (isActive(subItem.path)) {
							setOpenSubmenu({
								type: menuType as "main" | "others",
								index,
							});
							submenuMatched = true;
						}
					});
				}
			});
		});

		if (!submenuMatched) {
			setOpenSubmenu(null);
		}
	}, [pathname, isActive, navItems]);

	useEffect(() => {
		if (openSubmenu !== null) {
			const key = `${openSubmenu.type}-${openSubmenu.index}`;
			if (subMenuRefs.current[key]) {
				setSubMenuHeight((prevHeights) => ({
					...prevHeights,
					[key]: subMenuRefs.current[key]?.scrollHeight || 0,
				}));
			}
		}
	}, [openSubmenu]);

	const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
		setOpenSubmenu((prevOpenSubmenu) => {
			if (
				prevOpenSubmenu &&
				prevOpenSubmenu.type === menuType &&
				prevOpenSubmenu.index === index
			) {
				return null;
			}
			return { type: menuType, index };
		});
	};

	return (
		<aside
			className={`fixed mt-28 flex flex-col -top-2 lg:top-0 px-5 -left-1 bg-white text-gray-900 h-screen transition-all duration-300 ease-in-out z-999 border-r border-gray-200 
        ${
					isExpanded || isMobileOpen
						? "w-[280px]"
						: isHovered
							? "w-[280px]"
							: "w-[90px]"
				}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div
				className={`py-8 flex flex-col ${
					!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
				}`}
			>
				<Link href="/">
					<Image
						src="/images/crs-logo.png"
						alt="CRS"
						width={140}
						height={140}
						className="w-34 lg:w-40"
						priority
					/>
				</Link>
			</div>
			<div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
				<nav className="mb-6">
					<div className="flex flex-col gap-4">
						<div>{renderMenuItems(filteredNavItems, "main")}</div>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default AppSidebar;
