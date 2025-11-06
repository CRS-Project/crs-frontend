"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import DateInput from "@/components/form/DateInput";
import Input from "@/components/form/Input";
import UploadFile from "@/components/form/UploadFile";
import type { Document } from "@/types/document";
import { useGetDocumentByIDQuery } from "../_hooks/useGetDocumentByIDQuery";

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
	const { data } = useGetDocumentByIDQuery(document?.id ?? "");
	const methods = useForm<Document>({
		mode: "onTouched",
		defaultValues: data?.data,
	});

	React.useEffect(() => {
		if (data?.data) {
			methods.reset(data.data);
		}
	}, [data, methods]);

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
							Detail Data Document
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-2">
							<Input
								id="document_number"
								label="Document Number"
								placeholder="Input Document Number"
								readOnly
							/>
							<Input
								id="document_title"
								label="Document Title"
								placeholder="Input Document Title"
								readOnly
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
								readOnly
							/>
							<Input
								id="category"
								label="Document Category"
								placeholder="Input Document Category"
								readOnly
							/>
							<DateInput
								id="deadline"
								label="Deadline"
								placeholder="Input Deadline Date"
								readOnly
							/>
							<Input
								id="company_document_number"
								label="Company Document Number"
								placeholder="Input Company Document Number"
								readOnly
							/>
							<Input
								id="constructor_document_number"
								label="Constructor Document Number"
								placeholder="Input Constructor Document Number"
								readOnly
							/>
							<Input
								id="ctr_number"
								label="CTR Number"
								placeholder="Input CTR Number"
								readOnly
							/>
							<Input
								id="subdiscipline"
								label="SubDiscipline"
								placeholder="Input SubDiscipline"
								readOnly
							/>
						</div>
					</FormProvider>
					<Button size="lg" onClick={onClose} className="w-full">
						Cancel
					</Button>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
