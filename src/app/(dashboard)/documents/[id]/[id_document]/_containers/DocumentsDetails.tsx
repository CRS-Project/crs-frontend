/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { ArrowLeft, Download, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Loading from "@/app/loading";
import Button from "@/components/button/Button";
import CommentCard from "@/components/card/CommentCard";
import type { Comment } from "@/types/comment";
import { useFetchComments } from "../_hooks/useCommentQuery";
import CreateCommentModal from "./_commentModals/CreateCommentModal";
import ConcernDetailModal from "./ConcernDetailContainer";

export default function DocumentsDetails() {
	const router = useRouter();
	const [filteredType, setFilteredType] = React.useState<any>(
		new Set(["accepted", "rejected"]),
	);
	const [isOpen, setIsOpen] = React.useState({
		create: false,
	});

	const { data: comments, isLoading } = useFetchComments(
		"d37cc922-d310-4cdd-829f-d2f18ef6c08d",
		"0240ddc0-48d3-420c-919d-8f0f4f758cac",
	);

	if (isLoading) {
		return <Loading />;
	}

	const highlightedPackage = "Marine-1219-2132";
	const highlightedTitle =
		"01. Alignment of project execution strategy across Dual FEED";

	return (
		<div className="space-y-6 px-8 max-md:px-4">
			{/* Banner */}
			<div className="flex flex-col gap-4 xl:flex-row">
				<div className="w-full rounded-2xl bg-blue-500 p-6 text-white md:p-8">
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
								{highlightedPackage}
							</h2>
							<p className="text-sm text-white/70 md:text-base">
								{highlightedTitle}
							</p>
						</div>
						<div className="w-full flex gap-4 flex-row items-end md:justify-end">
							<Button
								rightIcon={Download}
								size="lg"
								variant="white"
								className="w-full sm:w-auto lg:px-8 text-blue-500 font-semibold"
								onClick={() => {}}
							>
								Download Data Concern
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col md:flex-row mb-10">
				{/* Comment Section */}
				<div className="flex flex-col gap-[27px] border-r-1 pr-[2.5rem] w-full md:w-[60%]">
					{/* Comment Header */}
					<div className="w-full flex justify-between items-center">
						<h1 className="font-bold text-[1.5rem]">All Comments</h1>
						<div className="flex gap-2">
							<Button
								variant="blue"
								leftIcon={Plus}
								className="w-fit max-md:w-full"
								onClick={() => setIsOpen({ ...isOpen, create: true })}
							>
								Add Comment
							</Button>
							<Dropdown>
								<DropdownTrigger>
									<Button
										variant="blue"
										leftIcon={Filter}
										className="w-fit max-md:w-full"
									>
										Filter
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									disallowEmptySelection
									aria-label="Filter Options"
									closeOnSelect={false}
									selectedKeys={filteredType}
									selectionMode="multiple"
									variant="flat"
									onSelectionChange={setFilteredType}
								>
									<DropdownItem key="accepted">Accepted</DropdownItem>
									<DropdownItem key="rejected">Rejected</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>

					{/* Comment Fill */}
					<div className="flex flex-col gap-[27px]">
						{comments?.map((comment: Comment) => (
							<CommentCard key={comment.id} comments={comment} />
						))}
					</div>
				</div>

				{/* Detail Concern */}
				<div className="w-full pl-[2.5rem] md:w-[40%]">
					<h1 className="font-bold text-[1.5rem]">Detail of Concern</h1>
					<ConcernDetailModal concern={null} />
				</div>
			</div>

			<CreateCommentModal
				isOpen={isOpen.create}
				onClose={() => setIsOpen({ ...isOpen, create: false })}
			/>
		</div>
	);
}
