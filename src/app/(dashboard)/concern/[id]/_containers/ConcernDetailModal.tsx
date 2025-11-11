"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import type { Concern } from "@/types/concern";
import { useGetConcernByIDQuery } from "../_hooks/useGetConcernByIDQuery";

interface ConcernDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	concern: Concern | null;
}

export default function ConcernDetailModal({
	isOpen,
	onClose,
	concern,
}: ConcernDetailModalProps) {
	const { data } = useGetConcernByIDQuery(concern?.id ?? "");
	const methods = useForm<Concern>({
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
							Detail Concern
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-2">
							<Input
								id="user_discipline"
								label="Discipline"
								placeholder="Input Discipline"
								readOnly
								validation={{ required: "Discipline wajib diisi!" }}
							/>
							<Input
								id="review_focus"
								label="Review Focus"
								placeholder="Input Review Focus"
								readOnly
								validation={{ required: "Review Focus wajib diisi!" }}
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
