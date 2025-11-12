"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { X } from "lucide-react";
import Link from "next/link";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import UploadFile from "@/components/form/UploadFile";
import type { ImportDocumentRequest } from "@/types/document";
import { useImportDocumentMutation } from "../_hooks/useImportDocumentMutation";

interface ImportDocumentModalProps {
	isOpen: boolean;
	onClose: () => void;
	packageId: string;
}

export default function ImportDocumentModal({
	isOpen,
	onClose,
	packageId,
}: ImportDocumentModalProps) {
	const methods = useForm<ImportDocumentRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset } = methods;

	const { mutate, isPending } = useImportDocumentMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		packageId,
	});

	const onSubmit: SubmitHandler<ImportDocumentRequest> = (data) => {
		mutate(data);
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
								onClick={() => {
									onClose();
									reset();
								}}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</ModalHeader>
						<ModalBody>
							<h1 className="text-[#1B1B1B] font-bold text-4xl">
								Import Documents
							</h1>

							<FormProvider {...methods}>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									<UploadFile
										id="FileSheet"
										label="Upload Document"
										maxSize={10000000}
										accept={{
											"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
												[".xlsx"],
											"application/vnd.ms-excel": [".xls"],
										}}
										maxFiles={1}
										helperText={
											<>
												Max. size picture 10mb, file type Excel,{" "}
												<Link
													className="text-blue-600 underline font-semibold"
													target="_blank"
													href="https://docs.google.com/spreadsheets/d/1wSENSTLdVw6i7y4IJidPP4Ylc2kKvLD3/edit?usp=sharing&ouid=106139707180062575407&rtpof=true&sd=true"
												>
													Download Template
												</Link>
											</>
										}
										validation={{ required: "File is required" }}
									/>

									<div className="grid grid-cols-2 gap-3 pb-8 mt-3">
										<Button
											onClick={() => {
												onClose();
												reset();
											}}
											variant="secondary"
											size="lg"
											className="w-full"
											disabled={isPending}
										>
											Cancel
										</Button>
										<Button
											type="submit"
											variant="primary"
											size="lg"
											className="w-full"
											isLoading={isPending}
										>
											Generate Excel Documents
										</Button>
									</div>
								</form>
							</FormProvider>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
