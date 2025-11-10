"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import { STATUS_DOCUMENT_OPTIONS } from "@/constants/document";
import type { CreateDocumentRequest } from "@/types/document";
import { useCreateDocumentMutation } from "../_hooks/useCreateDocumentMutation";
import { useDocumentUpload } from "../_hooks/useDocumentUpload";

interface CreateDocumentModalProps {
	isOpen: boolean;
	onClose: () => void;
	packageId: string;
}

export default function CreateDocumentModal({
	isOpen,
	onClose,
	packageId,
}: CreateDocumentModalProps) {
	const { mutateAsync: uploadFile, isPending: isUploading } =
		useDocumentUpload();
	const methods = useForm<CreateDocumentRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset } = methods;

	const { mutate, isPending: isUpdating } = useCreateDocumentMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		uploadFile,
		packageId,
	});

	const onSubmit: SubmitHandler<CreateDocumentRequest> = (data) => {
		mutate(data);
	};

	const isPending = isUploading || isUpdating;
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
								id="id"
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
							<Input
								id="document_serial_number"
								label="Document Serial Number"
								placeholder="Input Document Serial Number"
								validation={{ required: "Document Serial Number wajib diisi!" }}
							/>
							<UploadFile
								id="document_file"
								maxSize={10485760}
								accept={{
									"application/pdf": [".pdf"],
								}}
								maxFiles={1}
								helperText="Max. size docs 10mb, file type PDF"
							/>
							<Input
								id="document_type"
								label="Document Type"
								placeholder="Input Document Type"
								validation={{ required: "Document Type wajib diisi!" }}
							/>
							<Input
								id="document_category"
								label="Document Category"
								placeholder="Input Document Category"
								validation={{ required: "Document Category wajib diisi!" }}
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
								id="contractor_document_number"
								label="Contractor Document Number"
								placeholder="Input Contractor Document Number"
								validation={{
									required: "Contractor Document Number wajib diisi!",
								}}
							/>
							<Input
								id="ctr_number"
								label="CTR Number"
								placeholder="Input CTR Number"
								validation={{ required: "CTR Number wajib diisi!" }}
							/>
							<Input
								id="wbs"
								label="WBS"
								placeholder="Input WBS"
								validation={{ required: "WBS wajib diisi!" }}
							/>
							<Input
								id="discipline"
								label="Discipline"
								placeholder="Input Discipline"
								validation={{ required: "Discipline wajib diisi!" }}
							/>
							<Input
								id="sub_discipline"
								label="SubDiscipline"
								placeholder="Input SubDiscipline"
								validation={{ required: "SubDiscipline wajib diisi!" }}
							/>
							<SelectInput
								id="status"
								label="Status Document"
								placeholder="Input Status Document"
								validation={{ required: "Status Document wajib diisi!" }}
								options={STATUS_DOCUMENT_OPTIONS}
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
