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
import ServerPagination from "@/components/table/ServerPagination";
import Table from "@/components/table/Table";
import type { Document } from "@/types/document";
import { useDocumentsTableQuery } from "../_hooks/useDocumentsTableQuery";
import CreateDocumentModal from "./CreateDocumentModal";
import DeleteDocumentModal from "./DeleteDocumentModal";
import DocumentDetailModal from "./DocumentDetailModal";
import EditDocumentModal from "./EditDocumentModal";

export default function DocumentsTable() {
	const [selectedPerPage, setSelectedPerPage] = React.useState<any>(
		new Set(["10"]),
	);
	const [visibleColumns, setVisibleColumns] = React.useState<any>(
		new Set([
			"document_number",
			"document_title",
			"type",
			"package",
			"deadline",
			"status",
		]),
	);
	const [isOpen, setIsOpen] = React.useState({
		detail: false,
		create: false,
		edit: false,
		delete: false,
	});
	const [selectedDocument, setSelectedDocument] =
		React.useState<Document | null>(null);

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
	} = useDocumentsTableQuery();

	const highlightedPackage = data?.[0]?.package ?? "OLNG ITS";
	const highlightedTitle =
		data?.[0]?.document_name ?? "Floating Production, Storage, and Offloading";

	const documentTableColumns = React.useMemo(
		() => getDocumentTableColumns(isOpen, setIsOpen, setSelectedDocument),
		[isOpen],
	);

	const filteredColumns = React.useMemo(() => {
		return documentTableColumns.filter((column) => {
			const columnKey = getColumnKey(column);

			if (columnKey === "action") return true;
			if (!columnKey) return false;

			return visibleColumns === "all" || visibleColumns.has(columnKey);
		});
	}, [visibleColumns, documentTableColumns]);

	const selectedPerPageValue = React.useMemo(
		() => Array.from(selectedPerPage).join(", "),
		[selectedPerPage],
	);

	const handleColumnVisibilityChange = React.useCallback((keys: any) => {
		if (keys === "all") {
			setVisibleColumns(
				new Set([
					"document_number",
					"document_title",
					"type",
					"package",
					"deadline",
					"status",
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
			<div className="flex flex-col gap-4 xl:flex-row">
				<div className="w-full rounded-2xl bg-blue-500 p-6 text-white md:p-8">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="space-y-2 w-full">
							<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
								{highlightedPackage}
							</h2>
							<p className="text-sm text-white/70 md:text-base">
								{highlightedTitle}
							</p>
						</div>
						<div className="w-full flex gap-4 flex-row items-end md:justify-end">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<Button
									variant="white"
									size="lg"
									className="w-full sm:w-auto text-blue-500 font-semibold justify-center"
								>
									Import Document
								</Button>
								<Button
									rightIcon={Plus}
									size="lg"
									variant="white"
									className="w-full sm:w-auto lg:px-8 text-blue-500 font-semibold"
									onClick={() => setIsOpen({ ...isOpen, create: true })}
								>
									Add New Document
								</Button>
							</div>
						</div>
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
								<DropdownItem key="document_number">
									Document Number
								</DropdownItem>
								<DropdownItem key="document_title">Document Title</DropdownItem>
								<DropdownItem key="type">Doc Type</DropdownItem>
								<DropdownItem key="package">Package</DropdownItem>
								<DropdownItem key="deadline">Deadline</DropdownItem>
								<DropdownItem key="status">Status</DropdownItem>
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

				<DocumentDetailModal
					document={selectedDocument}
					isOpen={isOpen.detail}
					onClose={() => setIsOpen({ ...isOpen, detail: false })}
				/>
				<CreateDocumentModal
					isOpen={isOpen.create}
					onClose={() => setIsOpen({ ...isOpen, create: false })}
				/>
				<EditDocumentModal
					document={selectedDocument}
					isOpen={isOpen.edit}
					onClose={() => setIsOpen({ ...isOpen, edit: false })}
				/>
				<DeleteDocumentModal
					document={selectedDocument}
					isOpen={isOpen.delete}
					onClose={() => setIsOpen({ ...isOpen, delete: false })}
				/>
			</div>
		</div>
	);
}

function getDocumentTableColumns(
	isOpen: { detail: boolean; create: boolean; edit: boolean; delete: boolean },
	setIsOpen: React.Dispatch<
		React.SetStateAction<{
			detail: boolean;
			create: boolean;
			edit: boolean;
			delete: boolean;
		}>
	>,
	setSelectedDocument: React.Dispatch<React.SetStateAction<Document | null>>,
): ColumnDef<Document>[] {
	return [
		{
			accessorKey: "document_number",
			header: "DOCUMENT NUMBER",
			enableColumnFilter: false,
		},
		{
			accessorKey: "document_title",
			header: "DOCUMENT TITLE",
			enableColumnFilter: false,
		},
		{
			accessorKey: "type",
			header: "DOC TYPE",
			enableColumnFilter: false,
		},
		{
			accessorKey: "package",
			header: "PACKAGE",
			enableColumnFilter: false,
			enableSorting: false,
		},
		{
			accessorKey: "deadline",
			header: "DEADLINE",
			enableColumnFilter: false,
		},
		{
			accessorKey: "status",
			header: "STATUS",
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
								setSelectedDocument(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<PencilLine
							onClick={() => {
								setIsOpen({ ...isOpen, edit: true });
								setSelectedDocument(row.original);
							}}
							size={20}
							className="text-[#737373] cursor-pointer hover:text-[#737373]/80"
						/>
						<Trash2
							onClick={() => {
								setIsOpen({ ...isOpen, delete: true });
								setSelectedDocument(row.original);
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

function getColumnKey(column: ColumnDef<Document>): string | undefined {
	if ("accessorKey" in column && typeof column.accessorKey === "string") {
		return column.accessorKey;
	}
	return undefined;
}
