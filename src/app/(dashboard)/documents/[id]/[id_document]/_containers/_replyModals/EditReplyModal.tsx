"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import CommentCard from "@/components/card/CommentCard";
import TextArea from "@/components/form/TextArea";
import type { Comment, EditCommentRequest } from "@/types/comment";

interface EditReplyModalProps {
	parentComment: Comment | null;
	reply: Comment | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditReplyModal({
	isOpen,
	onClose,
	parentComment,
	reply,
}: EditReplyModalProps) {
	const methods = useForm<EditCommentRequest>({
		mode: "onTouched",
		defaultValues: {
			document_id: "",
			section: reply?.section ?? "",
			comment: reply?.comment ?? "",
			baseline: reply?.baseline ?? "",
		},
	});

	React.useEffect(() => {
		if (reply) {
			methods.reset();
		}
	}, [reply, methods]);

	const { handleSubmit, reset } = methods;

	// TODO: Add mutation hook when API is ready
	// const { mutate, isPending } = useEditReplyMutation({
	// 	onSuccess: () => {
	// 		onClose();
	// 		reset();
	// 	},
	// 	id: reply?.id ?? "",
	// });

	const onSubmit: SubmitHandler<EditCommentRequest> = (data) => {
		console.log("Edit reply:", data);
		// mutate(data);
		onClose();
		reset();
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
						<h2 className="text-2xl font-bold text-[#52525B]">Edit Reply</h2>
					</div>

					{/* Show parent comment in preview mode */}
					{parentComment && (
						<div className="my-4">
							<CommentCard comments={parentComment} isPreview={true} />
						</div>
					)}

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
							<TextArea
								className="h-[91px]"
								id="comment"
								label="Reply Text"
								placeholder="Input Reply Text"
								validation={{ required: "Reply Text is required!" }}
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
								<Button className="col-span-2" type="submit" size="lg">
									Save Update Reply
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
