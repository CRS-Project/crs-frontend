"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import type { Concern } from "@/types/concern";
import { useDeleteConcernMutation } from "../_hooks/useDeleteConcernMutation";

interface ConcernDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	concern: Concern | null;
}

export default function DeleteConcernModal({
	isOpen,
	onClose,
	concern,
}: ConcernDetailModalProps) {
	const { mutate, isPending } = useDeleteConcernMutation({
		onSuccess: () => {
			onClose();
		},
	});

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
								Delete Concern?
							</h1>
							<p className="text-[#1B1B1B] font-semibold text-xl">
								Are you sure you want to delete concern{" "}
								<span className="text-[#920B3A]">
									"{concern?.user_discipline}"
								</span>
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
									onClick={() => mutate(concern?.id ?? "")}
									variant="red"
									size="lg"
									className="w-full"
									isLoading={isPending}
								>
									Yes, Delete Concern
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
