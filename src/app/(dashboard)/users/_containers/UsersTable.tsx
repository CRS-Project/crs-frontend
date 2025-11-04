"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import SelectInput, { type SelectOption } from "@/components/form/SelectInput";
import ServerPagination from "@/components/table/ServerPagination";
import Table from "@/components/table/Table";
import {
	entriesOptions,
	formatRoleName,
	useWasteBankTableQuery,
	type WasteBankItem,
} from "../_hooks/useUsersTableQuery";

export default function DaftarBankSampah() {
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
		roleOptions,
		isLoading,
		handleSearchChange,
		handleRoleChange,
		handlePerPageChange,
		handlePageChange,
		setSorting,
	} = useWasteBankTableQuery();

	return (
		<div className="mt-4 w-full space-y-6">
			<FormProvider {...methods}>
				<div className="grid grid-cols-9 gap-4">
					<div className="col-span-6">
						<Input
							id="search"
							placeholder="Cari Bank Sampah"
							rightIcon={Search}
							onChange={handleSearchChange}
							className="w-full rounded-md border-gray-200 bg-white"
							rightIconClassName="w-7"
						/>
					</div>

					<SelectInput
						id="role"
						options={roleOptions}
						label={null}
						placeholder="Kategori"
						onChange={(option) => {
							const selected = option as SelectOption;
							const value = selected?.value || "";
							handleRoleChange(String(value));
						}}
						isLoading={isLoading}
						isClearable={true}
						isSearchable={false}
						containerClassName="col-span-2"
					/>

					{/* <SelectInput
						id="sort"
						options={sortOptions}
						label={null}
						placeholder="Urutkan"
						onChange={(option) => {
							const selected = option as SelectOption;
							const value = selected?.value || "";
							handleSortChange(String(value));
						}}
						isClearable={false}
						isSearchable={false}
						containerClassName="col-span-2"
					/> */}

					<SelectInput
						id="per_page"
						options={entriesOptions}
						label={null}
						onChange={(option) => {
							const selected = option as SelectOption;
							if (selected) {
								handlePerPageChange(String(selected.value));
							}
						}}
						isClearable={false}
						isSearchable={false}
						containerClassName="col-span-1"
					/>
				</div>
			</FormProvider>

			<div className="">
				<Table
					data={data}
					columns={wasteBankColumns}
					isLoading={isLoading}
					sorting={sorting}
					setSorting={setSorting}
				/>
			</div>
			<ServerPagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

export const wasteBankColumns: ColumnDef<WasteBankItem>[] = [
	{
		accessorKey: "institution",
		header: "Nama Bank Sampah",
		enableColumnFilter: false,
	},
	{
		id: "location",
		header: "Lokasi",
		enableColumnFilter: false,
		accessorFn: (row) => `${row.city}, ${row.province}`,
		cell: ({ getValue }) => <span>{getValue<string>()}</span>,
	},
	{
		accessorKey: "role",
		header: "Kategori",
		enableSorting: false,
		enableColumnFilter: false,
		cell: ({ row }) => (
			<span>{formatRoleName(row.getValue<string>("role"))}</span>
		),
	},
	// {
	// 	accessorKey: "capacity",
	// 	header: "Penyimpanan (m³)",
	// 	accessorFn: (row) => {
	// 		const nonRecycled = row?.storage_info?.storages?.find(
	// 			(s: any) => s.is_for_recycled_material === false,
	// 		);
	// 		return nonRecycled ? nonRecycled.volume.toLocaleString("id-ID") : "-";
	// 	},
	// 	enableColumnFilter: false,
	// },
	{
		accessorKey: "total_workers",
		header: "Jumlah Collector",
		accessorFn: (row) => `${row?.waste_bank_profile?.total_workers || "-"}`,
		enableColumnFilter: false,
	},
	{
		accessorKey: "action",
		header: "Aksi",
		enableColumnFilter: false,
		enableSorting: false,
		cell: ({ row }) => (
			<Link
				href={`/government/waste-bank/detail?id=${row.original.id}`}
				className="rounded-full bg-neutral-50 px-3 py-1"
			>
				Lihat Detail
			</Link>
		),
	},
];
