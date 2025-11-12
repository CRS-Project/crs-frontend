"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import { COMMENT_STATUS } from "@/lib/data";
import type { Comment } from "@/types/comment";
import { useEditCommentMutation } from "../_hooks/useEditCommentMutation";

interface UpdateStatusModalProps {
	isOpen: boolean;
	onClose: () => void;
	comment: Comment | null;
}

export default function UpdateStatusModal({
	isOpen,
	onClose,
	comment,
}: UpdateStatusModalProps) {
	const { id_concern, id_document } = useParams();

	const mutation = useEditCommentMutation({
		area_of_concern_group_id: id_concern as string,
		area_of_concern_id: id_document as string,
		comment_id: comment?.id as string,
		onSuccess: () => {
			onClose();
		},
	});

	const handleChangeStatus = (status: string) => () => {
		if (!comment) return;

		const data = {
			...comment,
			document_id: comment.document_id || "",
			status,
			is_close_out_comment: status === COMMENT_STATUS.ACCEPTED,
		};
		mutation.mutate(data);
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
				{(onCloseModal) => (
					<>
						<ModalHeader className="flex w-full justify-end">
							<IconButton
								variant="ghost"
								onClick={onCloseModal}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</ModalHeader>
						<ModalBody>
							<h1 className="text-[#1B1B1B] font-bold text-4xl">
								Change Status
							</h1>
							<p className="text-[#1B1B1B] font-semibold text-xl">
								Are you sure want to changes status comment{" "}
								<span className="text-[#920B3A]">{comment?.id}</span>?
							</p>
							<div className="grid grid-cols-2 gap-3 pb-8 mt-3">
								<Button
									onClick={handleChangeStatus(COMMENT_STATUS.REJECTED)}
									variant="red"
									size="lg"
									className="w-full"
								>
									Set Rejected
								</Button>
								<Button
									onClick={handleChangeStatus(COMMENT_STATUS.ACCEPTED)}
									variant="primary"
									size="lg"
									className="w-full"
								>
									Set Accepted
								</Button>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
