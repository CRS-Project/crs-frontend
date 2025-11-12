/** biome-ignore-all lint/suspicious/noExplicitAny: Unknown HeroUi Key Type */
"use client";

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { ArrowLeft, Filter, Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import Loading from "@/app/loading";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import CommentCard from "@/components/card/CommentCard";
import { ROLE } from "@/lib/data";
import type { Comment } from "@/types/comment";
import { useFetchComments } from "../_hooks/useCommentQuery";
import { useGetAreaConcernByID } from "../_hooks/useGetAreaConcernByID";
import CreateCommentModal from "./_commentModals/CreateCommentModal";
import ConcernDetailModal from "./ConcernDetailContainer";

export default function DocumentsDetails() {
	const router = useRouter();
	const { id, id_document } = useParams();
	const { user } = useAuthStore();

	const { data: concern } = useGetAreaConcernByID(
		id as string,
		id_document as string,
	);

	const { data: comments, isLoading } = useFetchComments(
		id as string,
		id_document as string,
	);

	const [filteredType, setFilteredType] = React.useState<any>(
		new Set(["ACCEPT", "REJECT", "NULL"]),
	);

	const [isOpen, setIsOpen] = React.useState({
		create: false,
	});

	const filteredComments = React.useMemo(() => {
		if (!comments) return [];
		return comments.filter((comment: Comment) =>
			filteredType.has(comment.status === null ? "NULL" : comment.status),
		);
	}, [comments, filteredType]);

	if (isLoading) {
		return <Loading />;
	}

	const highlightedPackage =
		concern?.area_of_concern_id || "Area of Concern Unavailable";
	const highlightedTitle =
		concern?.description ||
		"No description available for this area of concern.";

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
								{highlightedPackage}
							</h2>
							<p className="text-sm text-white/70 md:text-base">
								{highlightedTitle}
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

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 mb-10">
				<div className="w-full lg:col-span-5 lg:pl-[2.5rem] lg:order-2 order-1">
					<h1 className="font-bold text-[1.5rem] mb-4">Detail of Concern</h1>
					<ConcernDetailModal concern={concern} />
				</div>

				<div className="flex flex-col gap-[27px] lg:border-r-1 lg:pr-[2.5rem] w-full lg:col-span-7 lg:order-1 order-2">
					{/* Comment Header */}
					<div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<h1 className="font-bold text-[1.5rem]">All Comments</h1>
						<div className="flex gap-2 w-full sm:w-auto">
							{user?.role !== ROLE.CONTRACTOR && (
								<Button
									variant="blue"
									leftIcon={Plus}
									className="flex-1 sm:w-fit md:flex-auto"
									onClick={() => setIsOpen({ ...isOpen, create: true })}
								>
									Add Comment
								</Button>
							)}
							<Dropdown>
								<DropdownTrigger>
									<Button
										variant="blue"
										leftIcon={Filter}
										className="flex-1 sm:w-fit md:flex-auto"
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
									<DropdownItem key="ACCEPT">Accepted</DropdownItem>
									<DropdownItem key="REJECT">Rejected</DropdownItem>
									<DropdownItem key="NULL">No Status</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>

					{/* Comment Fill */}
					<div className="flex flex-col gap-[27px]">
						{filteredComments?.map((comment: Comment) => (
							<CommentCard key={comment.id} comments={comment} />
						))}
					</div>
				</div>
			</div>

			<CreateCommentModal
				isOpen={isOpen.create}
				onClose={() => setIsOpen({ ...isOpen, create: false })}
			/>
		</div>
	);
}
