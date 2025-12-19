"use client";
import { ArrowRight, ChevronDown, NotebookPen, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import UnstyledLink from "@/components/links/UnstyledLink";
import { useSidebar } from "@/context/SidebarContext";
import Data from "../../public/icons/data.svg";
import Documents from "../../public/icons/documents.svg";
import Home from "../../public/icons/home.svg";
import Users from "../../public/icons/users.svg";

type NavItem = {
	name: string;
	icon: React.ReactNode;
	path?: string;
	subItems?: { name: string; path: string }[];
};

const AppSidebar: React.FC = () => {
	const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
	const { user } = useAuthStore();
	const logoutFn = useAuthStore((s) => s.logout);
	const router = useRouter();

	const pathname = usePathname();

	const navItems: NavItem[] = useMemo(
		() => [
			{
				icon: <Home className="w-fit h-fit" />,
				name: "Home",
				path: "/home",
			},
			{
				icon: <Data className="w-fit h-fit" />,
				name: "Data",
				path: "/data",
			},
			{
				icon: <NotebookPen />,
				name: "Discipline Groups",
				path: "/concern",
			},
			{
				icon: <Documents className="w-fit h-fit" />,
				name: "Documents",
				path: "/documents",
			},
			{
				icon: <Users className="w-fit h-fit" />,
				name: "Users",
				path: "/users",
			},
		],
		[],
	);

	const filterNavItems = (role: string) => {
		switch (role) {
			case "SUPER ADMIN":
				return navItems;
			case "CONTRACTOR":
				return navItems.filter(
					(link) =>
						link.name === "Home" ||
						link.name === "Data" ||
						link.name === "Documents" ||
						link.name === "Discipline Groups",
				);
			case "REVIEWER":
				return navItems.filter(
					(link) =>
						link.name === "Home" ||
						link.name === "Data" ||
						link.name === "Documents" ||
						link.name === "Discipline Groups",
				);
			default:
				return [];
		}
	};

	const filteredNavItems = filterNavItems(user?.role || "");

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
										? "text-brand-500"
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
								className={`relative flex items-center w-full gap-3 ${
									(isExpanded || isHovered || isMobileOpen) && "px-3 py-2"
								} font-medium rounded-lg text-theme-sm group ${
									isActive(nav.path)
										? "bg-blue-500 text-white"
										: "text-secondary-1000 hover:bg-gray-100 group-hover:text-gray-700"
								}`}
							>
								<span
									className={`${
										isActive(nav.path)
											? "text-brand-500 "
											: "text-secondary-1000 group-hover:text-gray-700"
									} ${
										!(isExpanded || isHovered || isMobileOpen) &&
										"aspect-square p-2 flex justify-center items-center mx-auto"
									}`}
								>
									{nav.icon}
								</span>
								{(isExpanded || isHovered || isMobileOpen) && (
									<span
										className={`menu-item-text font-semibold ${
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

	const isActive = useCallback(
		(path: string) => pathname.includes(path),
		[pathname],
	);

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
			className={`fixed flex flex-col p-6 -left-1 bg-white text-gray-900 ${
				isMobileOpen ? "h-[calc(100vh-72.8px)]" : "h-screen"
			} transition-all justify-between duration-300 ease-in-out z-999 border-r border-gray-200
        ${
					isExpanded || isMobileOpen
						? "w-[280px]"
						: isHovered
							? "w-[280px]"
							: "w-[90px]"
				}
        ${isMobileOpen ? "translate-x-0 mt-[72.8px]" : "-translate-x-full"}
        lg:translate-x-0`}
			onMouseEnter={() => !isExpanded && setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div>
				<div
					className={`flex flex-col  ${
						!isExpanded && !isHovered
							? "lg:justify-center mb-8"
							: "justify-start mb-12"
					}`}
				>
					<Link href="/">
						<Image
							src="/images/CRS-Logo-V1.png"
							alt="CRS"
							width={300}
							height={140}
							className="w-28 lg:w-40"
							priority
						/>
					</Link>
				</div>
				<div className="flex flex-col overflow-x-hidden overflow-y-auto duration-300 ease-linear no-scrollbar">
					<nav className="mb-6">
						<div className="flex flex-col gap-4">
							<div>{renderMenuItems(filteredNavItems, "main")}</div>
						</div>
					</nav>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				{isMobileOpen && (
					<div className="mt-4 w-full px-3">
						<div className="flex items-center gap-3 p-2 rounded-lg bg-white">
							<Image
								src={
									user?.photo_profile
										? `https://${user?.photo_profile}`
										: "/images/user.png"
								}
								alt="User"
								width={40}
								height={40}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-700">
									{user?.name ?? "Super Admin ITS"}
								</p>
								<div className="flex gap-2 mt-1">
									<Button
										onClick={() => {
											router.push("/profile");
										}}
										variant="ghost"
										className="text-sm text-gray-700"
									>
										Profile
									</Button>
									<Button
										onClick={() => {
											logoutFn();
											router.push("/login");
										}}
										variant="ghost"
										className="text-sm text-red-600"
									>
										Logout
									</Button>
								</div>
							</div>
						</div>
					</div>
				)}
				{(isExpanded || isHovered || isMobileOpen) && (
					<div
						className={`flex flex-col items-center overflow-x-hidden overflow-y-auto gap-2 md:gap-4 px-4 py-5 w-[232px] bg-blue-500 rounded-lg`}
					>
						<h2 className="text-white font-bold text-base md:text-lg">
							How To Use This App?
						</h2>

						<Button rightIcon={ArrowRight} variant="white" className="w-full">
							<UnstyledLink
								href={
									"https://drive.google.com/file/d/11RZgbHuo0vhln-2Oo7Qyqbz0JMko0OI0/view?usp=sharing"
								}
								target="_blank"
							>
								Guidebook
							</UnstyledLink>
						</Button>
						<Button rightIcon={ArrowRight} variant="white" className="w-full">
							<UnstyledLink
								href="https://1drv.ms/f/c/275fab05357fb5e1/IgBM_a447xSwSIMU3T8I_7O8AQSERY9KIVBvpef_xKu-2TQ?e=z0ZWoT"
								target="_blank"
							>
								Resources
							</UnstyledLink>
						</Button>
						<Button rightIcon={Play} variant="primary" className="w-full">
							<UnstyledLink href="https://youtu.be/RuLvao-3nyQ" target="_blank">
								Video Tutorial
							</UnstyledLink>
						</Button>
					</div>
				)}
			</div>
		</aside>
	);
};

export default AppSidebar;
