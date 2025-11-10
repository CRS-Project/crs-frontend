"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import CommentCard from "@/components/card/CommentCard";
import TextArea from "@/components/form/TextArea";
import type { Comment, CreateReplyRequest } from "@/types/comment";

interface CreateReplyModalProps {
	isOpen: boolean;
	onClose: () => void;
	comment: Comment;
}

export default function CreateReplyModal({
	comment,
	isOpen,
	onClose,
}: CreateReplyModalProps) {
	const methods = useForm<CreateReplyRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset } = methods;

	const onSubmit: SubmitHandler<CreateReplyRequest> = (data) => {
		console.log("Create reply:", data);
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
						<h2 className="text-2xl font-bold text-[#52525B]">Reply Comment</h2>
					</div>

					<div className="mt-6">
						<CommentCard comments={comment as Comment} isPreview={true} />
					</div>
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-2">
							<TextArea
								className="h-[91px]"
								id="comment"
								label="Comment Text"
								placeholder="Comment Text"
								validation={{ required: "Comment Text is required!" }}
							/>

							<div className="grid grid-cols-3 py-8 gap-3">
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										onClose();
										reset();
									}}
									className="justify-center"
								>
									Cancel
								</Button>
								<Button
									className="col-span-2 justify-center"
									type="submit"
									rightIcon={Send}
								>
									Send
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
