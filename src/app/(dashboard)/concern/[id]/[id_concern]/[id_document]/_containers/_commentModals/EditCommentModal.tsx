"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import type { Comment, EditCommentRequest } from "@/types/comment";
import { useEditCommentMutation } from "../../_hooks/useEditCommentMutation";
import { useGetDocument } from "../../_hooks/useGetDocument";

interface EditCommentModalProps {
	comment: Comment | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditCommentModal({
	isOpen,
	onClose,
	comment,
}: EditCommentModalProps) {
	const { id_concern, id_document } = useParams();
	const { data: documentIDs } = useGetDocument();

	const methods = useForm<EditCommentRequest>({
		mode: "onSubmit",
		defaultValues: {
			document_id: comment?.document_id ?? "",
			section: comment?.section ?? "",
			comment: comment?.comment ?? "",
			baseline: comment?.baseline ?? "",
		},
	});

	React.useEffect(() => {
		if (comment) {
			methods.reset(comment);
		}
	}, [comment, methods]);

	const { handleSubmit, reset } = methods;

	const mutation = useEditCommentMutation({
		area_of_concern_group_id: id_concern as string,
		area_of_concern_id: id_document as string,
		comment_id: comment?.id as string,
		onSuccess: () => {
			onClose();
			reset();
		},
	});

	const onSubmit: SubmitHandler<EditCommentRequest> = async (data) => {
		mutation.mutate(data);
	};

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
								reset();
							}}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">Edit Comment</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
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
								placeholder="Input Comment Text"
								validation={{ required: "Comment Text is required!" }}
							/>
							<TextArea
								className="h-[91px]"
								id="baseline"
								label="Baseline/Justification/Reference"
								placeholder="Input Baseline/Justification/Reference"
								validation={{ required: "Baseline is required!" }}
							/>
							<SelectInput
								id="document_id"
								label="Document ID"
								options={
									documentIDs
										? documentIDs.map(
												(doc: {
													id: string;
													company_document_number: string;
												}) => ({
													value: doc.id,
													label: doc.company_document_number,
												}),
											)
										: []
								}
								placeholder="Select Document ID"
								validation={{ required: "Document ID is required!" }}
							/>
							<Input
								id="section"
								label="Section Document"
								placeholder="Input Section Document"
								className="border-[#E2E8F0]"
								validation={{ required: "Section Document is required!" }}
							/>

							<div className="grid grid-cols-3 py-8 gap-3">
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										onClose();
										reset();
									}}
								>
									Cancel
								</Button>
								<Button
									className="col-span-2"
									type="submit"
									size="lg"
									isLoading={mutation.isPending}
								>
									Save Update Comment
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
