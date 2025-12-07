"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { File, Send, X } from "lucide-react";
import { useParams } from "next/navigation";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import UploadFile from "@/components/form/UploadFile";
import ButtonLink from "@/components/links/ButtonLink";
import type { CreateCommentRequest } from "@/types/comment";
import { useCreateCommentMutation } from "../../_hooks/useCreateCommentMutation";
import { useGetDocument } from "../../_hooks/useGetDocument";

interface CreateCommentModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CreateCommentModal({
	isOpen,
	onClose,
}: CreateCommentModalProps) {
	const { id, id_concern, id_document } = useParams();
	const { data: documentIDs } = useGetDocument(id as string);
	const { user } = useAuthStore();

	const methods = useForm<CreateCommentRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset, watch } = methods;
	const attachFileUrl = watch("attach_file_url");

	const mutation = useCreateCommentMutation({
		area_of_concern_group_id: id_concern as string,
		area_of_concern_id: id_document as string,
		onSuccess: () => {
			onClose();
			reset();
		},
	});

	const onSubmit: SubmitHandler<CreateCommentRequest> = async (data) => {
		mutation.mutate(data);
	};

	const handleClose = () => {
		onClose();
		reset();
	};

	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		const check = () =>
			setIsMobile(window.matchMedia("(max-width: 768px)").matches);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	const sheetRef = React.useRef<HTMLDivElement | null>(null);
	const dragControls = useDragControls();

	return isMobile ? (
		isOpen ? (
			<>
				<motion.div
					className="fixed inset-0 z-[2000] bg-black/40"
					onClick={handleClose}
				/>
				<motion.div
					drag="y"
					dragControls={dragControls}
					dragListener={false}
					dragConstraints={{ top: 0, bottom: 0 }}
					onDragEnd={(_e, info) => {
						if (info.offset.y > 120 || info.velocity.y > 800) {
							handleClose();
						}
					}}
					initial={{ y: "100%" }}
					animate={{ y: 0 }}
					exit={{ y: "100%" }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					ref={sheetRef}
					className="fixed bottom-0 left-0 right-0 z-[2001] rounded-t-2xl bg-white shadow-xl max-h-[85vh] overflow-auto"
				>
					<div className="px-4 py-3">
						<div
							className="mx-auto h-0.5 w-12 bg-slate-200 rounded mb-3"
							onPointerDown={(e) => dragControls.start(e as any)}
						/>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold">Add Comment</h3>
							<IconButton
								variant="ghost"
								onClick={handleClose}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</div>
					</div>
					<div className="px-4 py-6">
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								<TextArea
									className="h-[91px]"
									id="comment"
									label="Comment Text"
									placeholder="Comment Text"
									validation={{ required: "Comment Text is required!" }}
								/>
								<TextArea
									className="h-[91px]"
									id="baseline"
									label="Baseline/Justification/Reference"
									placeholder="Input Baseline/Justification/Reference"
								/>
								<SelectInput
									id="document_id"
									label="Document ID"
									options={
										documentIDs
											? documentIDs.map(
													(doc: {
														id: string;
														document_title: string;
														company_document_number: string;
													}) => ({
														value: doc.id,
														label: `${doc.company_document_number} - ${doc.document_title}`,
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
									validation={{ required: "Section Document is required!" }}
								/>

								<div>
									<LabelText>Attachment (Optional)</LabelText>
									{attachFileUrl && (
										<ButtonLink
											href={`https://${attachFileUrl}`}
											className="w-full mb-2"
											variant="secondary"
											leftIcon={File}
										>
											Open File
										</ButtonLink>
									)}
									<UploadFile
										id="attach_file_url"
										label=""
										maxSize={5000 * 1024}
										accept={{
											"image/*": [".jpg", ".jpeg", ".png"],
										}}
										maxFiles={1}
										uploadToApi
										helperText="Max. size image 5mb"
									/>
								</div>

								<div className="grid grid-cols-3 py-4 gap-3">
									<Button
										variant="secondary"
										size="lg"
										onClick={handleClose}
										className="justify-center"
									>
										Cancel
									</Button>
									<Button
										className="col-span-2 justify-center"
										type="submit"
										isLoading={mutation.isPending}
										rightIcon={Send}
									>
										Send
									</Button>
								</div>
							</form>
						</FormProvider>
					</div>
				</motion.div>
			</>
		) : null
	) : (
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
						<h2 className="text-2xl font-bold text-[#52525B]">Add Comment</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
							<TextArea
								className="h-[91px]"
								id="comment"
								label="Comment Text"
								placeholder="Comment Text"
								validation={{ required: "Comment Text is required!" }}
							/>
							<TextArea
								className="h-[91px]"
								id="baseline"
								label="Baseline/Justification/Reference"
								placeholder="Input Baseline/Justification/Reference"
							/>
							<SelectInput
								id="document_id"
								label="Document ID"
								options={
									documentIDs
										? documentIDs.map(
												(doc: {
													id: string;
													document_title: string;
													company_document_number: string;
												}) => ({
													value: doc.id,
													label: `${doc.company_document_number} - ${doc.document_title}`,
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
								validation={{ required: "Section Document is required!" }}
							/>

							<div>
								<LabelText>Attachment (Optional)</LabelText>
								{attachFileUrl && (
									<ButtonLink
										href={`https://${attachFileUrl}`}
										className="w-full mb-2"
										variant="secondary"
										leftIcon={File}
									>
										Open File
									</ButtonLink>
								)}
								<UploadFile
									id="attach_file_url"
									label=""
									maxSize={5000 * 1024}
									accept={{
										"image/*": [".jpg", ".jpeg", ".png"],
									}}
									maxFiles={1}
									uploadToApi
									helperText="Max. size image 5mb"
								/>
							</div>

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
									isLoading={mutation.isPending}
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
