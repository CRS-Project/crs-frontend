"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import type { AreaOfConcern } from "@/types/concern";
import { useDeleteAreaOfConcernMutation } from "../_hooks/useDeleteAreaOfConcernMutation";

interface DeleteAreaOfConcernModalProps {
	isOpen: boolean;
	onClose: () => void;
	concern: AreaOfConcern | null;
}

export default function DeleteAreaOfConcernModal({
	isOpen,
	onClose,
	concern,
}: DeleteAreaOfConcernModalProps) {
	const { id_concern } = useParams();

	const { mutate: deleteAreaOfConcern, isPending } =
		useDeleteAreaOfConcernMutation({
			area_of_concern_group_id: id_concern as string,
			area_of_concern_id: concern?.id || "",
			onSuccess: () => {
				onClose();
			},
		});

	const handleDelete = () => {
		deleteAreaOfConcern();
	};

	return (
		<Modal
			isOpen={isOpen}
			size="2xl"
			onClose={onClose}
			placement="center"
			classNames={{
				wrapper: "fixed z-[2000] ",
				backdrop: "z-[1999] bg-black/50",
				closeButton: "hidden",
			}}
		>
			<ModalContent className="px-6">
				{(onClose) => (
					<>
						<ModalHeader className="flex w-full justify-end">
							<IconButton
								variant="ghost"
								onClick={onClose}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</ModalHeader>
						<ModalBody>
							<h1 className="text-[#1B1B1B] font-bold text-4xl">
								Delete List Document?
							</h1>
							<p className="text-[#1B1B1B] font-semibold text-xl">
								Are you sure you want to delete document list with id{" "}
								<span className="text-[#920B3A]">"{concern?.id}"</span>
							</p>
							<div className="grid grid-cols-2 gap-3 pb-8 mt-3">
								<Button
									onClick={onClose}
									variant="secondary"
									size="lg"
									className="w-full"
									disabled={isPending}
								>
									Cancel
								</Button>
								<Button
									onClick={handleDelete}
									variant="red"
									size="lg"
									className="w-full"
									isLoading={isPending}
								>
									{isPending ? "Deleting..." : "Yes, Delete Area of Concern"}
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
