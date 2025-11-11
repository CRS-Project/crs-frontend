"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import type { Comment } from "@/types/comment";
import { useDeleteCommentMutation } from "../_hooks/useDeleteComment";

interface DeleteCommentModalProps {
	isOpen: boolean;
	onClose: () => void;
	comment: Comment | null;
}

export default function DeleteCommentModal({
	isOpen,
	onClose,
	comment,
}: DeleteCommentModalProps) {
	const { id, id_document } = useParams();

	const mutation = useDeleteCommentMutation({
		area_of_concern_group_id: id as string,
		area_of_concern_id: id_document as string,
		comment_id: comment?.id as string,
		onSuccess: () => {
			onClose();
		},
	});

	const handleDelete = () => {
		mutation.mutate();
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
								Delete Comment
							</h1>
							<p className="text-[#1B1B1B] font-semibold text-xl">
								Are you sure you want to delete this comment from{" "}
								<span className="text-[#920B3A]">
									{comment?.user_comment?.name}
								</span>
								?
							</p>
							<div className="grid grid-cols-2 gap-3 pb-8 mt-3">
								<Button
									onClick={onClose}
									variant="secondary"
									size="lg"
									className="w-full"
								>
									Cancel
								</Button>
								<Button
									onClick={handleDelete}
									variant="red"
									size="lg"
									className="w-full"
								>
									Yes, Delete Comment
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
