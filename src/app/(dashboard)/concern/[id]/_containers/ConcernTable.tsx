/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import type { ColumnDef } from "@tanstack/react-table";
import {
	Eye,
	Filter,
	ListOrdered,
	PencilLine,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Loading from "@/app/loading";
import Button from "@/components/button/Button";
import SummaryCard from "@/components/card/SummaryCard";
import Input from "@/components/form/Input";
import ServerPagination from "@/components/table/ServerPagination";
import Table from "@/components/table/Table";
import type { Concern } from "@/types/concern";
import type { UserDiscipline } from "@/types/userDiscipline";
import { useGetPackageById } from "../../../_hooks/useGetPackageById";
import { useConcernTableQuery } from "../_hooks/useConcernTableQuery";
import { useGetConcernStatsQuery } from "../_hooks/useGetConcernStatsQuery";
import { useGetUserDiscipline } from "../_hooks/useGetUserDiscipline";
import ConcernDetailModal from "./ConcernDetailModal";
import CreateConcernModal from "./CreateConcernModal";
import DeleteConcernModal from "./DeleteConcernModal";
import EditConcernModal from "./EditConcernModal";

export default function ConcernTable({ id }: { id: string }) {
	const {
		data: packageData,
		isLoading: isLoadingPackage,
		error: packageError,
	} = useGetPackageById(id);

	const {
		data: userDisciplineData,
		isLoading: isLoadingUserDiscipline,
		error: userDisciplineError,
	} = useGetUserDiscipline();

	const { data: statsData } = useGetConcernStatsQuery(id);

	const [selectedPerPage, setSelectedPerPage] = React.useState<any>(
		new Set(["10"]),
	);
	const [visibleColumns, setVisibleColumns] = React.useState<any>(
		new Set(["user_discipline", "review_focus"]),
	);
	const [isOpen, setIsOpen] = React.useState({
		detail: false,
		create: false,
		edit: false,
		delete: false,
		import: false,
	});
	const [selectedConcern, setSelectedConcern] = React.useState<Concern | null>(
		null,
	);

	const methods = useForm({
		defaultValues: {
			per_page: 10,
		},
	});

	const {
		currentPage,
		sorting,
		data,
		totalPages,
		totalData,
		isLoading,
		handleSearchChange,
		handlePerPageChange: handlePerPageChangeValue,
		handlePageChange,
		setSorting,
	} = useConcernTableQuery(id);

	const concernTableColumns = React.useMemo(
		() => getConcernTableColumns(isOpen, setIsOpen, setSelectedConcern),
		[isOpen],
	);

	const filteredColumns = React.useMemo(() => {
		return concernTableColumns.filter((column) => {
			const columnKey = getColumnKey(column);

			if (columnKey === "action") return true;
			if (!columnKey) return false;

			return visibleColumns === "all" || visibleColumns.has(columnKey);
		});
	}, [visibleColumns, concernTableColumns]);

	const selectedPerPageValue = React.useMemo(
		() => Array.from(selectedPerPage).join(", "),
		[selectedPerPage],
	);

	const handleColumnVisibilityChange = React.useCallback((keys: any) => {
		if (keys === "all") {
			setVisibleColumns(new Set(["user_discipline", "review_focus"]));
			return;
		}
		setVisibleColumns(keys);
	}, []);

	const handlePerPageChange = React.useCallback(
		(keys: any) => {
			if (keys === "all") return;
			setSelectedPerPage(keys);
			const value = Array.from(keys)[0] as string;
			handlePerPageChangeValue(value);
		},
		[handlePerPageChangeValue],
	);

	if (isLoadingPackage || isLoadingUserDiscipline) {
		return <Loading />;
	}

	if (
		packageError ||
		!packageData ||
		userDisciplineError ||
		!userDisciplineData
	) {
		notFound();
	}

	const packageId = packageData?.data?.id;
	const packageName = packageData?.data?.name || "No Name Available";
	const packageDescription =
		packageData?.data?.description || "No Description Available";

	const userDisciplineOptions: { id: string; name: string }[] =
		userDisciplineData?.data?.map((d: UserDiscipline) => ({
			id: d.id,
			name: d.name,
		})) ?? [];

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
					</div>
					<Image
						width={100}
						height={100}
						src="/images/dashboard/pixel-rectorat.png"
						className="absolute bottom-0 right-0 top-0 h-full w-auto"
						alt="Background Header"
					/>
				</div>
			</div>
			<div className="flex flex-col xl:flex-row justify-between">
				<div className="flex flex-col md:flex-row gap-4">
					<SummaryCard
						title="Total Area of Concern"
						value={statsData?.data?.total_area_of_concern_group || 0}
						variant="primary"
					/>
					<SummaryCard
						title="Total Comments"
						value={statsData?.data?.total_comment || 0}
						variant="white"
					/>
				</div>
				<div className="mt-4 w-full flex gap-4 flex-row items-end md:justify-end">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<Button
							rightIcon={Plus}
							size="lg"
							variant="primary"
							className="w-full sm:w-auto lg:px-8 text-white font-medium"
							onClick={() => setIsOpen({ ...isOpen, create: true })}
						>
							Create Area of Concern
						</Button>
					</div>
				</div>
			</div>
			<div className="mt-8 w-full">
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
								<Button
									variant="secondary"
									leftIcon={Filter}
									className="w-fit max-md:w-full"
								>
									Columns
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label="Column visibility"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								variant="flat"
								onSelectionChange={handleColumnVisibilityChange}
							>
								<DropdownItem key="user_discipline">Discipline</DropdownItem>
								<DropdownItem key="review_focus">Review Focus</DropdownItem>
							</DropdownMenu>
						</Dropdown>
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

				<Table
					data={data}
					columns={filteredColumns}
					isLoading={isLoading}
					sorting={sorting}
					setSorting={setSorting}
					redirection={`/concern/${id}`}
				/>

				<ServerPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>

				<ConcernDetailModal
					concern={selectedConcern}
					isOpen={isOpen.detail}
					onClose={() => setIsOpen({ ...isOpen, detail: false })}
				/>
				<CreateConcernModal
					isOpen={isOpen.create}
					onClose={() => setIsOpen({ ...isOpen, create: false })}
					packageId={packageId ?? ""}
					userDiscipline={userDisciplineOptions}
				/>
				<EditConcernModal
					concern={selectedConcern}
					isOpen={isOpen.edit}
					onClose={() => setIsOpen({ ...isOpen, edit: false })}
					packageId={packageId ?? ""}
					userDiscipline={userDisciplineOptions}
				/>
				<DeleteConcernModal
					concern={selectedConcern}
					isOpen={isOpen.delete}
					onClose={() => setIsOpen({ ...isOpen, delete: false })}
				/>
			</div>
		</div>
	);
}

function getConcernTableColumns(
	isOpen: {
		detail: boolean;
		create: boolean;
		edit: boolean;
		delete: boolean;
		import: boolean;
	},
	setIsOpen: React.Dispatch<
		React.SetStateAction<{
			detail: boolean;
			create: boolean;
			edit: boolean;
			delete: boolean;
			import: boolean;
		}>
	>,
	setSelectedConcern: React.Dispatch<React.SetStateAction<Concern | null>>,
): ColumnDef<Concern>[] {
	return [
		{
			accessorKey: "user_discipline",
			header: "DISCIPLINE",
			enableColumnFilter: false,
		},
		{
			accessorKey: "review_focus",
			header: "REVIEW FOCUS",
			enableColumnFilter: false,
		},
		{
			accessorKey: "action",
			header: "ACTION",
			enableColumnFilter: false,
			enableSorting: false,
			cell: ({ row }) => {
				return (
					<span className="flex items-center gap-2">
						<Eye
							onClick={() => {
								setIsOpen({ ...isOpen, detail: true });
								setSelectedConcern(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<PencilLine
							onClick={() => {
								setIsOpen({ ...isOpen, edit: true });
								setSelectedConcern(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<Trash2
							onClick={() => {
								setIsOpen({ ...isOpen, delete: true });
								setSelectedConcern(row.original);
							}}
							size={20}
							className="text-[#C20E4D] cursor-pointer hover:text-[#C20E4D]/80"
						/>
					</span>
				);
			},
		},
	];
}

function getColumnKey(column: ColumnDef<Concern>): string | undefined {
	if ("accessorKey" in column && typeof column.accessorKey === "string") {
		return column.accessorKey;
	}
	return undefined;
}
