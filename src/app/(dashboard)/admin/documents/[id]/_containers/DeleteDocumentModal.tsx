"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import type { Document } from "@/types/document";
import { useDeleteDocumentMutation } from "../_hooks/useDeleteDocumentMutation";

interface DocumentDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	document: Document | null;
}

export default function DocumentDetailModal({
	isOpen,
	onClose,
	document,
}: DocumentDetailModalProps) {
	const { mutate, isPending } = useDeleteDocumentMutation({
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
								Delete Document
							</h1>
							<p className="text-[#1B1B1B] font-semibold text-xl">
								Are you sure you want to delete document{" "}
								<span className="text-[#920B3A]">
									{document?.document_name}
								</span>
								?
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
									onClick={() => mutate(document?.id ?? "")}
									variant="red"
									size="lg"
									className="w-full"
									isLoading={isPending}
								>
									Yes, Delete Document
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
