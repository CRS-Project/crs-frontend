/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import {
	ArrowLeft,
	Download,
	ListOrdered,
	PlusIcon,
	Search,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Loading from "@/app/loading";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import AreaOfConcernCard from "@/components/card/AreaOfConcernCard";
import Input from "@/components/form/Input";
import ServerPagination from "@/components/table/ServerPagination";
import { ROLE } from "@/lib/data";
import { useAreaOfConcernQuery } from "../_hooks/useAreaOfConcernQuery";
import { useGetConcernByID } from "../_hooks/useGetConcernByID";
import ConcernDetailContainer from "./ConcernDetailContainer";
import CreateAreaOfConcernModal from "./CreateAreaOfConcernModal";

export default function DocumentsDetails() {
	const router = useRouter();
	const { id, id_concern } = useParams();
	const { user } = useAuthStore();

	const { data: areaOfConcern } = useGetConcernByID(id_concern as string);

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
	} = useAreaOfConcernQuery(id_concern as string);

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

	const highlightedTitle =
		areaOfConcern?.user_discipline || "Area of Concern Unavailable";

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="space-y-6 px-8 max-md:px-4">
			{/* Banner */}
			<div className="flex flex-col gap-4 xl:flex-row">
				<div className="w-full rounded-2xl bg-blue-500 p-6 text-white md:p-8 relative overflow-hidden">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="space-y-2 w-full">
							<Button
								leftIcon={ArrowLeft}
								size="lg"
								variant="white"
								className="w-full sm:w-auto lg:px-8 text-blue-500 font-semibold mb-[1rem]"
								onClick={() => router.back()}
							>
								Back
							</Button>
							<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
								Concern
							</h2>
							<p className="text-sm text-white/70 md:text-base">
								{highlightedTitle}
							</p>
						</div>
						<div className="w-full flex gap-4 flex-row items-end md:justify-end z-10">
							<Button
								rightIcon={Download}
								size="lg"
								variant="white"
								className="w-full sm:w-auto lg:px-8 text-blue-500 font-semibold"
								onClick={() => {}}
							>
								Download Data Concern
							</Button>
							{user?.role !== ROLE.CONTRACTOR && (
								<Button
									rightIcon={PlusIcon}
									size="lg"
									variant="white"
									className="w-full sm:w-auto lg:px-8 text-blue-500 font-semibold"
									onClick={() => setIsOpen({ ...isOpen, create: true })}
								>
									Create Area Of Concern
								</Button>
							)}
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

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 mb-10">
				<div className="w-full lg:col-span-7 lg:pr-[2.5rem] lg:border-r-1 lg:order-1 order-2">
					<div className="flex justify-between items-center mb-4 max-md:flex-col max-md:gap-2">
						<h1 className="font-bold text-[1.5rem] text-left">
							Area of Concern
						</h1>
						<div className="flex items-center gap-3 w-full max-md:flex-col">
							<div className="w-1/2 max-md:w-full flex-1">
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
							<Dropdown>
								<DropdownTrigger>
									<Button
										leftIcon={ListOrdered}
										className="w-fit max-md:w-full"
									>
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

					<p className="mb-6 font-semibold text-[#A1A1AA] text-[16px]">
						Showing {Math.min(parseInt(selectedPerPageValue), totalData)} of{" "}
						{totalData} total data
					</p>

					<div className="space-y-4">
						{data.map((concern) => (
							<AreaOfConcernCard
								key={concern.id}
								concern={concern}
								linkHref={`/concern/${id}/${id_concern}/${concern.id}`}
								packageId={id as string}
							/>
						))}
					</div>

					<ServerPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</div>

				<div className="flex flex-col gap-[27px] w-full lg:col-span-5 lg:pl-[2.5rem] lg:order-2 order-1">
					<h1 className="font-bold text-[1.5rem]">Detail of Concern</h1>
					<ConcernDetailContainer concern={areaOfConcern} />
				</div>
			</div>

			<CreateAreaOfConcernModal
				isOpen={isOpen.create}
				onClose={() => setIsOpen({ ...isOpen, create: false })}
				concernGroupId={id_concern as string}
			/>
		</div>
	);
}
