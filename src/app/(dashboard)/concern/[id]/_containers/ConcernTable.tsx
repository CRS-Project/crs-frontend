/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { Download, ListOrdered, Plus, Search } from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Loading from "@/app/loading";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import DisciplineGroupCard from "@/components/card/DisciplineGroupCard";
import SummaryCard from "@/components/card/SummaryCard";
import Input from "@/components/form/Input";
import ServerPagination from "@/components/table/ServerPagination";
import { ROLE } from "@/lib/data";
import { useGetPackageById } from "../../../_hooks/useGetPackageById";
import { useConcernTableQuery } from "../_hooks/useConcernTableQuery";
import { useGetConcernStatsQuery } from "../_hooks/useGetConcernStatsQuery";
import CreateConcernModal from "./CreateConcernModal";

export default function ConcernTable({ id }: { id: string }) {
	const router = useRouter();
	const { user } = useAuthStore();
	const {
		data: packageData,
		isLoading: isLoadingPackage,
		error: packageError,
	} = useGetPackageById(id);

	const { data: statsData } = useGetConcernStatsQuery(id);

	const [selectedPerPage, setSelectedPerPage] = React.useState<any>(
		new Set(["10"]),
	);
	const [isOpen, setIsOpen] = React.useState({
		create: false,
	});

	const methods = useForm({
		defaultValues: {
			per_page: 10,
		},
	});

	const {
		currentPage,
		data,
		totalPages,
		totalData,
		isLoading,
		handleSearchChange,
		handlePerPageChange: handlePerPageChangeValue,
		handlePageChange,
	} = useConcernTableQuery(id);

	const selectedPerPageValue = React.useMemo(
		() => Array.from(selectedPerPage).join(", "),
		[selectedPerPage],
	);

	const handlePerPageChange = React.useCallback(
		(keys: any) => {
			if (keys === "all") return;
			setSelectedPerPage(keys);
			const value = Array.from(keys)[0] as string;
			handlePerPageChangeValue(value);
		},
		[handlePerPageChangeValue],
	);

	if (isLoadingPackage) {
		return <Loading />;
	}

	if (packageError || !packageData) {
		notFound();
	}

	const packageId = packageData?.data?.id;
	const packageName = packageData?.data?.name || "No Name Available";
	const packageDescription =
		packageData?.data?.description || "No Description Available";

	return (
		<div className="space-y-6 px-8 max-md:px-4">
			<div className="flex flex-col gap-4 xl:flex-row">
				<div className="w-full rounded-2xl bg-blue-500 p-6 text-white md:p-8 relative">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="space-y-2 w-full relative">
							<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
								{packageName}
							</h2>
							<p className="text-sm text-white font-medium md:text-base">
								{packageDescription}
							</p>
						</div>
						<div
							className={`w-full flex gap-4 flex-row items-end md:justify-end ${
								user?.role === ROLE.REVIEWER && "hidden"
							}`}
						>
							<div className="flex flex-col w-full md:w-auto gap-3 sm:flex-row sm:items-center z-20">
								<Button
									variant="white"
									size="lg"
									className="w-full sm:w-auto text-blue-500 font-semibold justify-center"
									onClick={() => {
										router.push(`/pdf/package/${packageId}`);
									}}
									rightIcon={Download}
								>
									Download Data Discipline Group
								</Button>
							</div>
						</div>
					</div>
					<Image
						width={100}
						height={100}
						src="/images/dashboard/pixel-rectorat.png"
						className="absolute bottom-0 right-0 top-0 h-full w-auto hidden md:block"
						alt="Background Header"
					/>
				</div>
			</div>
			<div className="flex flex-col xl:flex-row justify-between">
				<div className="flex flex-col md:flex-row gap-4">
					<SummaryCard
						title="Total Discipline"
						value={statsData?.data?.total_discipline_group || 0}
						variant="primary"
					/>
					<SummaryCard
						title="Total Comments"
						value={statsData?.data?.total_comment || 0}
						variant="white"
					/>
				</div>
				<div
					className={`mt-4 w-full flex gap-4 flex-row items-end md:justify-end ${
						user?.role === ROLE.REVIEWER && "hidden"
					}`}
				>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<Button
							rightIcon={Plus}
							size="lg"
							variant="primary"
							className="w-full sm:w-auto lg:px-8 text-white font-medium"
							onClick={() => setIsOpen({ ...isOpen, create: true })}
						>
							Create Discipline Group
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-8 w-full mb-8">
				<div className="flex justify-between max-md:flex-col max-md:gap-2">
					<div className="w-1/2 max-md:w-full">
						<FormProvider {...methods}>
							<Input
								id="search"
								placeholder="Type to Search"
								rightIcon={Search}
								onChange={handleSearchChange}
								className="bg-[#F4F4F5] rounded-sm overflow-hidden border-0 outline-0 ring-0"
								rightIconClassName="w-7 text-[#A1A1AA]"
							/>
						</FormProvider>
					</div>

					<div className="flex items-center gap-3 max-md:w-full max-md:justify-end">
						<Dropdown>
							<DropdownTrigger>
								<Button leftIcon={ListOrdered} className="w-fit max-md:w-full">
									{selectedPerPageValue}
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Rows per page"
								selectedKeys={selectedPerPage}
								selectionMode="single"
								onSelectionChange={handlePerPageChange}
							>
								<DropdownItem key="10">10</DropdownItem>
								<DropdownItem key="20">20</DropdownItem>
								<DropdownItem key="50">50</DropdownItem>
								<DropdownItem key="100">100</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>

				<p className="mt-2 mb-6 font-semibold text-[#A1A1AA] text-[16px]">
					Showing {Math.min(parseInt(selectedPerPageValue), totalData)} of{" "}
					{totalData} total data
				</p>

				{isLoading ? (
					<Loading />
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
						{data.map((concern) => (
							<DisciplineGroupCard
								key={concern.id}
								concern={concern}
								packageId={packageId ?? ""}
								areaOfConcernId={id}
							/>
						))}
					</div>
				)}

				<ServerPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>

				<CreateConcernModal
					isOpen={isOpen.create}
					onClose={() => setIsOpen((prev) => ({ ...prev, create: false }))}
					packageId={packageId ?? ""}
				/>
			</div>
		</div>
	);
}
