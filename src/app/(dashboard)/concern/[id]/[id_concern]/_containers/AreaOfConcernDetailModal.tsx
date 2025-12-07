"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import type { AreaOfConcern } from "@/types/concern";

interface AreaOfConcernDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	concern: AreaOfConcern | null;
}

export default function AreaOfConcernDetailModal({
	isOpen,
	onClose,
	concern,
}: AreaOfConcernDetailModalProps) {
	const methods = useForm<AreaOfConcern>({
		mode: "onTouched",
		defaultValues: concern || undefined,
	});

	React.useEffect(() => {
		if (concern) {
			methods.reset(concern);
		}
	}, [concern, methods]);

	// detect mobile (client-side only)
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const check = () =>
			setIsMobile(window.matchMedia("(max-width: 768px)").matches);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	const sheetRef = useRef<HTMLDivElement | null>(null);
	const dragControls = useDragControls();

	const consolidators = concern?.consolidators || [];

	if (isMobile) {
		return isOpen ? (
			<>
				<motion.div
					className="fixed inset-0 z-[2000] bg-black/40"
					onClick={onClose}
				/>

				<motion.div
					drag="y"
					dragControls={dragControls}
					dragListener={false}
					dragConstraints={{ top: 0, bottom: 0 }}
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
							onPointerDown={(e) => dragControls.start(e as any)}
						/>
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold">Detail List Document</h3>
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
							<div className="space-y-4">
								<Input
									id="document.company_document_number"
									label="Document ID"
									placeholder="Document ID"
									readOnly
								/>
								<div className="space-y-2">
									<LabelText>Consolidator</LabelText>
									<div className="flex flex-wrap gap-2">
										{consolidators.map((consolidator) => (
											<ConsolidatorChip
												key={consolidator.discipline_group_consolidator_id}
												name={consolidator.name}
											/>
										))}
									</div>
								</div>
							</div>
						</FormProvider>
						<div className="mt-6">
							<Button size="lg" onClick={onClose} className="w-full">
								Close
							</Button>
						</div>
					</div>
				</motion.div>
			</>
		) : null;
	}

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
							onClick={onClose}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">
							Detail List Document
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-4">
							<Input
								id="document.company_document_number"
								label="Document ID"
								placeholder="Document ID"
								readOnly
							/>
							<div className="space-y-2">
								<LabelText>Consolidator</LabelText>
								<div className="flex flex-wrap gap-2">
									{consolidators.map((consolidator, idx) => (
										<ConsolidatorChip
											key={consolidator.discipline_group_consolidator_id || idx}
											name={consolidator.name}
										/>
									))}
								</div>
							</div>
						</div>
					</FormProvider>
					<Button size="lg" onClick={onClose} className="w-full">
						Close
					</Button>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
