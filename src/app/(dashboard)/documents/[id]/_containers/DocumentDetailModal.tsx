"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { File, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
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

	const { watch } = methods;
	const currentDocumentUrl = watch("document_url");

	React.useEffect(() => {
		if (data?.data) {
			methods.reset(data.data);
		}
	}, [data, methods]);

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
					onClick={onClose}
				/>
				<motion.div
					drag="y"
					dragConstraints={{ top: 0, bottom: 0 }}
					dragControls={dragControls}
					dragListener={false}
					onDragEnd={(_e, info) => {
						if (info.offset.y > 120 || info.velocity.y > 800) {
							onClose();
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
							onPointerDown={(e) => dragControls.start(e)}
						/>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold">Detail Data Document</h3>
							<IconButton
								variant="ghost"
								onClick={onClose}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</div>
					</div>
					<div className="px-4 py-6">
						<FormProvider {...methods}>
							<div className="mb-2 space-y-2">
								<Input
									id="id"
									label="Document Number"
									placeholder="Input Document Number"
									readOnly
									validation={{ required: "Document Number wajib diisi!" }}
								/>
								<Input
									id="document_title"
									label="Document Title"
									placeholder="Input Document Title"
									validation={{ required: "Document Title wajib diisi!" }}
									readOnly
								/>
								<Input
									id="document_serial_number"
									label="Document Serial Number"
									placeholder="Input Document Serial Number"
									validation={{
										required: "Document Serial Number wajib diisi!",
									}}
									readOnly
								/>
								{currentDocumentUrl && (
									<div className="space-y-2">
										<h4 className="text-sm font-semibold text-gray-900">
											Upload Document
										</h4>
										<Link
											href={`https://${currentDocumentUrl}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
										>
											<File size={16} />
											<span>View Current Document</span>
										</Link>
									</div>
								)}
								<Input
									id="document_type"
									label="Document Type"
									placeholder="Input Document Type"
									validation={{ required: "Document Type wajib diisi!" }}
									readOnly
								/>
								<Input
									id="document_category"
									label="Document Category"
									placeholder="Input Document Category"
									validation={{ required: "Document Category wajib diisi!" }}
									readOnly
								/>
								<Input
									id="company_document_number"
									label="Company Document Number"
									placeholder="Input Company Document Number"
									validation={{
										required: "Company Document Number wajib diisi!",
									}}
									readOnly
								/>
								<Input
									id="contractor_document_number"
									label="Contractor Document Number"
									placeholder="Input Contractor Document Number"
									validation={{
										required: "Contractor Document Number wajib diisi!",
									}}
									readOnly
								/>
								<Input
									id="ctr_number"
									label="CTR Number"
									placeholder="Input CTR Number"
									validation={{ required: "CTR Number wajib diisi!" }}
									readOnly
								/>
								<Input
									id="wbs"
									label="WBS"
									placeholder="Input WBS"
									validation={{ required: "WBS wajib diisi!" }}
									readOnly
								/>
								<Input
									id="discipline"
									label="Discipline"
									placeholder="Input Discipline"
									validation={{ required: "Discipline wajib diisi!" }}
									readOnly
								/>
								<Input
									id="sub_discipline"
									label="SubDiscipline"
									placeholder="Input SubDiscipline"
									validation={{ required: "SubDiscipline wajib diisi!" }}
									readOnly
								/>
								<Input
									id="status"
									label="Status Document"
									placeholder="Input Status Document"
									validation={{ required: "Status Document wajib diisi!" }}
									readOnly
								/>
							</div>
						</FormProvider>
						<Button size="lg" onClick={onClose} className="w-full mt-4 md:mt-0">
							Cancel
						</Button>
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
								id="id"
								label="Document Number"
								placeholder="Input Document Number"
								readOnly
								validation={{ required: "Document Number wajib diisi!" }}
							/>
							<Input
								id="document_title"
								label="Document Title"
								placeholder="Input Document Title"
								validation={{ required: "Document Title wajib diisi!" }}
								readOnly
							/>
							<Input
								id="document_serial_number"
								label="Document Serial Number"
								placeholder="Input Document Serial Number"
								validation={{ required: "Document Serial Number wajib diisi!" }}
								readOnly
							/>
							{currentDocumentUrl && (
								<div className="space-y-2">
									<h4 className="text-sm font-semibold text-gray-900">
										Upload Document
									</h4>
									<Link
										href={`https://${currentDocumentUrl}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
									>
										<File size={16} />
										<span>View Current Document</span>
									</Link>
								</div>
							)}
							<Input
								id="document_type"
								label="Document Type"
								placeholder="Input Document Type"
								validation={{ required: "Document Type wajib diisi!" }}
								readOnly
							/>
							<Input
								id="document_category"
								label="Document Category"
								placeholder="Input Document Category"
								validation={{ required: "Document Category wajib diisi!" }}
								readOnly
							/>
							<Input
								id="company_document_number"
								label="Company Document Number"
								placeholder="Input Company Document Number"
								validation={{
									required: "Company Document Number wajib diisi!",
								}}
								readOnly
							/>
							<Input
								id="contractor_document_number"
								label="Contractor Document Number"
								placeholder="Input Contractor Document Number"
								validation={{
									required: "Contractor Document Number wajib diisi!",
								}}
								readOnly
							/>
							<Input
								id="ctr_number"
								label="CTR Number"
								placeholder="Input CTR Number"
								validation={{ required: "CTR Number wajib diisi!" }}
								readOnly
							/>
							<Input
								id="wbs"
								label="WBS"
								placeholder="Input WBS"
								validation={{ required: "WBS wajib diisi!" }}
								readOnly
							/>
							<Input
								id="discipline"
								label="Discipline"
								placeholder="Input Discipline"
								validation={{ required: "Discipline wajib diisi!" }}
								readOnly
							/>
							<Input
								id="sub_discipline"
								label="SubDiscipline"
								placeholder="Input SubDiscipline"
								validation={{ required: "SubDiscipline wajib diisi!" }}
								readOnly
							/>
							<Input
								id="status"
								label="Status Document"
								placeholder="Input Status Document"
								validation={{ required: "Status Document wajib diisi!" }}
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
