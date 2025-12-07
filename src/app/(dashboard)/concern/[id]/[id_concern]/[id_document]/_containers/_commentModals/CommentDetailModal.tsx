"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import type { Comment } from "@/types/comment";

interface CommentDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	comment: Comment | null;
}

export default function CommentDetailModal({
	isOpen,
	onClose,
	comment,
}: CommentDetailModalProps) {
	const { id } = useParams();

	const methods = useForm<Comment>({
		mode: "onTouched",
		defaultValues: comment ?? undefined,
	});

	React.useEffect(() => {
		if (comment) {
			methods.reset(comment);
		}
	}, [comment, methods]);

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
							<h3 className="text-lg font-semibold">Detail Comment</h3>
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
									placeholder="Comment Text"
									readOnly
								/>
								<TextArea
									className="h-[91px]"
									id="baseline"
									label="Baseline/Justification/Reference"
									placeholder="Input Baseline/Justification/Reference"
									readOnly
								/>
								<Input
									id="section"
									label="Section Document"
									placeholder="Section Document"
									className="border-[#E2E8F0]"
									readOnly
								/>
							</div>
						</FormProvider>
						<Button
							size="lg"
							onClick={onClose}
							className="w-full mt-4"
							variant="secondary"
						>
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
							onClick={onClose}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">
							Detail Comment
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-2">
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
								placeholder="Comment Text"
								readOnly
							/>
							<TextArea
								className="h-[91px]"
								id="baseline"
								label="Baseline/Justification/Reference"
								placeholder="Input Baseline/Justification/Reference"
								readOnly
							/>
							<Input
								id="section"
								label="Section Document"
								placeholder="Section Document"
								className="border-[#E2E8F0]"
								readOnly
							/>
						</div>
					</FormProvider>
					<Button
						size="lg"
						onClick={onClose}
						className="w-full"
						variant="secondary"
					>
						Cancel
					</Button>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
