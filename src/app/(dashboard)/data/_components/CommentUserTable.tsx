/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import type { ColumnDef } from "@tanstack/react-table";
import { ListOrdered, Search } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import ServerPagination from "@/components/table/ServerPagination";
import Table from "@/components/table/Table";
import type { User } from "@/types/user";
import { useUserCommentTableQuery } from "../_hooks/useUserCommentTableQuery";

export default function CommentUserTable({ packageId }: { packageId: string }) {
	const [selectedPerPage, setSelectedPerPage] = React.useState<any>(
		new Set(["10"]),
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
	} = useUserCommentTableQuery(packageId);

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

	return (
		<div className="space-y-6 px-8 max-md:px-4 mb-8">
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
					columns={userTableColumns}
					isLoading={isLoading}
					sorting={sorting}
					setSorting={setSorting}
				/>

				<ServerPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

const userTableColumns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: "ID",
		enableColumnFilter: false,
		enableSorting: false,
	},
	{
		accessorKey: "name",
		header: "Name",
		enableColumnFilter: false,
	},
	{
		accessorKey: "comment_closed",
		header: "Comment Closed",
		enableColumnFilter: false,
	},
	{
		accessorKey: "total_comment",
		header: "Total Comment",
		enableColumnFilter: false,
	},
];
