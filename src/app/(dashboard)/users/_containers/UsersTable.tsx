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
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import withAuth from "@/components/hoc/withAuth";
import ServerPagination from "@/components/table/ServerPagination";
import Table from "@/components/table/Table";
import type { User } from "@/types/user";
import {
	type Discipline,
	useGetAllDisciplineQuery,
} from "../_hooks/useGetAllDisciplineQuery";
import {
	type Package,
	useGetAllPackageQuery,
} from "../_hooks/useGetAllPackageQuery";
import { useUsersTableQuery } from "../_hooks/useUsersTableQuery";
import CreateUserModal from "./CreateUserModal";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import UserDetailModal from "./UserDetailModal";

function UsersTable() {
	const [selectedPerPage, setSelectedPerPage] = React.useState<any>(
		new Set(["10"]),
	);
	const [visibleColumns, setVisibleColumns] = React.useState<any>(
		new Set([
			"role",
			"package",
			"name",
			"initial",
			"email",
			"institution",
			"discipline",
		]),
	);
	const [isOpen, setIsOpen] = React.useState({
		detail: false,
		create: false,
		edit: false,
		delete: false,
	});
	const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

	const methods = useForm({
		defaultValues: {
			per_page: 10,
		},
	});

	const { data: packages, isPending: isLoadingPackages } =
		useGetAllPackageQuery();
	const { data: disciplines, isPending: isLoadingDisciplines } =
		useGetAllDisciplineQuery();

	const packageOptions = React.useMemo(() => {
		return (
			packages?.data?.map((pkg: Package) => ({
				value: pkg.id,
				label: pkg.name,
			})) || []
		);
	}, [packages]);

	const disciplineOptions = React.useMemo(() => {
		return (
			disciplines?.data?.map((disc: Discipline) => ({
				value: disc.id,
				label: disc.name,
			})) || []
		);
	}, [disciplines]);

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
	} = useUsersTableQuery();

	const userTableColumns = React.useMemo(
		() => getUserTableColumns(isOpen, setIsOpen, setSelectedUser),
		[isOpen],
	);

	const filteredColumns = React.useMemo(() => {
		return userTableColumns.filter((column) => {
			const columnKey = getColumnKey(column);

			if (columnKey === "action") return true;
			if (!columnKey) return false;

			return visibleColumns === "all" || visibleColumns.has(columnKey);
		});
	}, [visibleColumns, userTableColumns]);

	const selectedPerPageValue = React.useMemo(
		() => Array.from(selectedPerPage).join(", "),
		[selectedPerPage],
	);

	const handleColumnVisibilityChange = React.useCallback((keys: any) => {
		if (keys === "all") {
			setVisibleColumns(
				new Set([
					"role",
					"package",
					"name",
					"initial",
					"email",
					"institution",
					"discipline",
				]),
			);
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

	return (
		<div className="space-y-6 px-8 max-md:px-4">
			<div className="flex justify-between items-end max-md:flex-col max-md:items-start gap-4">
				<div className="grid grid-cols-4 max-md:grid-cols-3 gap-4 max-md:gap-2 w-[60%] pt-[10px] max-md:w-full">
					<div className="md:col-span-2 space-y-1 max-md:p-4 py-[18px] flex flex-col justify-center px-6 rounded-lg bg-blue-500 text-white">
						<p className="font-semibold text-[15px] max-md:text-sm">
							Total Users
						</p>
						<p className="font-semibold text-5xl max-md:text-3xl">
							{totalData}
						</p>
					</div>
					<div className="py-[18px] px-6 rounded-lg flex flex-col justify-center text-[#A1A1AA]">
						<p className="font-semibold text-[15px] max-md:text-sm">
							Users FPSO
						</p>
						<p className="font-semibold text-5xl max-md:text-3xl">832</p>
					</div>
					<div className="py-[18px] px-6 max-md:p-4 rounded-lg flex flex-col justify-center text-[#A1A1AA]">
						<p className="font-semibold text-[15px] max-md:text-sm">
							Users ONLG
						</p>
						<p className="font-semibold text-5xl max-md:text-3xl">256</p>
					</div>
				</div>
				<Button
					rightIcon={Plus}
					size="lg"
					className="lg:px-8"
					onClick={() => setIsOpen({ ...isOpen, create: true })}
				>
					Create New User
				</Button>
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
								<DropdownItem key="role">Role</DropdownItem>
								<DropdownItem key="package">Package</DropdownItem>
								<DropdownItem key="name">Name</DropdownItem>
								<DropdownItem key="initial">Initial</DropdownItem>
								<DropdownItem key="email">Email</DropdownItem>
								<DropdownItem key="institution">Institution</DropdownItem>
								<DropdownItem key="discipline">Discipline</DropdownItem>
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
				/>

				<ServerPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>

				<CreateUserModal
					isOpen={isOpen.create}
					onClose={() => setIsOpen({ ...isOpen, create: false })}
					packageOptions={packageOptions}
					disciplineOptions={disciplineOptions}
					isLoadingPackages={isLoadingPackages}
					isLoadingDisciplines={isLoadingDisciplines}
				/>

				<UserDetailModal
					user={selectedUser}
					isOpen={isOpen.detail}
					onClose={() => setIsOpen({ ...isOpen, detail: false })}
				/>

				<EditUserModal
					user={selectedUser}
					isOpen={isOpen.edit}
					onClose={() => setIsOpen({ ...isOpen, edit: false })}
					disciplineOptions={disciplineOptions}
					isLoadingDisciplines={isLoadingDisciplines}
				/>

				<DeleteUserModal
					user={selectedUser}
					isOpen={isOpen.delete}
					onClose={() => setIsOpen({ ...isOpen, delete: false })}
				/>
			</div>
		</div>
	);
}

function getUserTableColumns(
	isOpen: { detail: boolean; create: boolean; edit: boolean; delete: boolean },
	setIsOpen: React.Dispatch<
		React.SetStateAction<{
			detail: boolean;
			create: boolean;
			edit: boolean;
			delete: boolean;
		}>
	>,
	setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
): ColumnDef<User>[] {
	return [
		{
			accessorKey: "role",
			header: "ROLE",
			enableColumnFilter: false,
		},
		{
			accessorKey: "package",
			header: "PACKAGE",
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			accessorKey: "name",
			header: "NAME",
			enableColumnFilter: false,
		},
		{
			accessorKey: "initial",
			header: "INITIAL",
			enableColumnFilter: false,
		},
		{
			accessorKey: "email",
			header: "EMAIL",
			enableColumnFilter: false,
		},
		{
			accessorKey: "institution",
			header: "INSTITUTION",
			enableColumnFilter: false,
		},
		{
			accessorKey: "discipline",
			header: "DISCIPLINE",
			enableColumnFilter: false,
			enableSorting: false,
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
								setSelectedUser(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<PencilLine
							onClick={() => {
								setIsOpen({ ...isOpen, edit: true });
								setSelectedUser(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<Trash2
							onClick={() => {
								setIsOpen({ ...isOpen, delete: true });
								setSelectedUser(row.original);
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

export default withAuth(UsersTable, "admin");

function getColumnKey(column: ColumnDef<User>): string | undefined {
	if ("accessorKey" in column && typeof column.accessorKey === "string") {
		return column.accessorKey;
	}
	return undefined;
}
