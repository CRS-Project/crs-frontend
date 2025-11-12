"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import type { Comment } from "@/types/comment";
import { useGetDocument } from "../../_hooks/useGetDocument";

interface CommentDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	comment: Comment | null;
}

export default function CommentDetailModal({
	isOpen,
	onClose,
	comment,
}: CommentDetailModalProps) {
	const { data: documentIDs } = useGetDocument();

	const methods = useForm<Comment>({
		mode: "onTouched",
		defaultValues: comment ?? undefined,
	});

	React.useEffect(() => {
		if (comment) {
			methods.reset(comment);
		}
	}, [comment, methods]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			motionProps={{
				variants: {
					enter: { x: 0, opacity: 1 },
					exit: { x: "100%", opacity: 0 },
				},
				transition: { duration: 0.3, ease: "easeOut" },
			}}
			classNames={{
				wrapper:
					"fixed inset-0 flex justify-end items-start m-0 p-0 z-[2000] overflow-hidden",
				backdrop: "z-[1999] bg-black/50",
				base: "absolute top-0 right-0 h-screen max-w-2/5 rounded-none shadow-xl bg-white z-[2001] flex flex-col !m-0 !p-0 sm:!p-0 overflow-y-auto",
				closeButton: "hidden",
			}}
		>
			<ModalContent className="rounded-l-lg">
				<motion.div className="h-full px-13 py-8">
					<div className="flex gap-2 items-center">
						<IconButton
							variant="ghost"
							onClick={() => {
								onClose();
							}}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">
							Detail Comment
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-2">
							<Input
								id="id"
								label="ID Comment"
								placeholder="ID Comment"
								className="border-[#E2E8F0]"
								readOnly
							/>
							<TextArea
								className="h-[91px]"
								id="comment"
								label="Comment Text"
								placeholder="Comment Text"
								readOnly
							/>
							<TextArea
								className="h-[91px]"
								id="baseline"
								label="Baseline/Justification/Reference"
								placeholder="Input Baseline/Justification/Reference"
								readOnly
							/>
							<SelectInput
								id="document_id"
								label="Document ID"
								options={
									documentIDs
										? documentIDs.map(
												(doc: { id: string; document_title: string }) => ({
													value: doc.id,
													label: doc.document_title,
												}),
											)
										: []
								}
								placeholder="Select Document ID"
								validation={{ required: "Document ID is required!" }}
								readOnly
								disabled
							/>
							<Input
								id="section"
								label="Section Document"
								placeholder="Section Document"
								className="border-[#E2E8F0]"
								readOnly
							/>
						</div>
					</FormProvider>
					<Button
						size="lg"
						onClick={onClose}
						className="w-full"
						variant="secondary"
					>
						Cancel
					</Button>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
