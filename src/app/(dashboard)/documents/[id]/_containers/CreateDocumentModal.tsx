"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import UploadFile from "@/components/form/UploadFile";
import type { CreateDocumentRequest } from "@/types/document";
import { useCreateDocumentMutation } from "../_hooks/useCreateDocumentMutation";

interface CreateDocumentModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function CreateDocumentModal({
	isOpen,
	onClose,
}: CreateDocumentModalProps) {
	const methods = useForm<CreateDocumentRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset } = methods;

	const { mutate, isPending } = useCreateDocumentMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
	});

	const onSubmit: SubmitHandler<CreateDocumentRequest> = (data) => {
		mutate(data);
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
						<h2 className="text-2xl font-bold text-[#52525B]">Add Document</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
							<Input
								id="document_number"
								label="Document Number"
								placeholder="Input Document Number"
								validation={{ required: "Document Number wajib diisi!" }}
							/>
							<Input
								id="document_title"
								label="Document Title"
								placeholder="Input Document Title"
								validation={{ required: "Document Title wajib diisi!" }}
							/>
							<UploadFile
								id="pdf_document"
								label="PDF Document"
								maxSize={10000000000}
								accept={{
									"application/pdf": [".pdf"],
								}}
								maxFiles={1}
								helperText="Max. size docs 10mb, file type PDF"
							/>
							<Input
								id="type"
								label="Document Type"
								placeholder="Input Document Type"
								validation={{ required: "Document Type wajib diisi!" }}
							/>
							<Input
								id="category"
								label="Document Category"
								placeholder="Input Document Category"
								validation={{ required: "Document Category wajib diisi!" }}
							/>
							<DateInput
								id="deadline"
								label="Deadline"
								placeholder="Input Deadline Date"
								validation={{ required: "Deadline wajib diisi!" }}
							/>
							<Input
								id="company_document_number"
								label="Company Document Number"
								placeholder="Input Company Document Number"
								validation={{
									required: "Company Document Number wajib diisi!",
								}}
							/>
							<Input
								id="constructor_document_number"
								label="Constructor Document Number"
								placeholder="Input Constructor Document Number"
								validation={{
									required: "Constructor Document Number wajib diisi!",
								}}
							/>
							<Input
								id="ctr_number"
								label="CTR Number"
								placeholder="Input CTR Number"
								validation={{ required: "CTR Number wajib diisi!" }}
							/>
							<Input
								id="subdiscipline"
								label="SubDiscipline"
								placeholder="Input SubDiscipline"
								validation={{ required: "SubDiscipline wajib diisi!" }}
							/>

							<div className="grid grid-cols-3 py-8 gap-3">
								<Button
									variant="secondary"
									size="lg"
									onClick={() => {
										onClose();
										reset();
									}}
									disabled={isPending}
									className="justify-center"
								>
									Cancel
								</Button>
								<Button
									className="col-span-2 justify-center"
									type="submit"
									isLoading={isPending}
								>
									Save Update Data
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
