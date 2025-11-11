"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import type { Concern, EditConcernRequest } from "@/types/concern";
import { useEditConcernMutation } from "../_hooks/useEditConcernMutation";
import { useGetConcernByIDQuery } from "../_hooks/useGetConcernByIDQuery";

interface EditConcernModalProps {
	concern: Concern | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function EditConcernModal({
	isOpen,
	onClose,
	concern,
}: EditConcernModalProps) {
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

	const { handleSubmit, reset } = methods;

	const { mutate, isPending } = useEditConcernMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		id: concern?.id ?? "",
	});

	const onSubmit: SubmitHandler<EditConcernRequest> = (data) => {
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
						<h2 className="text-2xl font-bold text-[#52525B]">Edit Concern</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
							<Input
								id="user_discipline"
								label="Discipline"
								placeholder="Input Discipline"
								validation={{ required: "Discipline wajib diisi!" }}
							/>
							<Input
								id="review_focus"
								label="Review Focus"
								placeholder="Input Review Focus"
								validation={{ required: "Review Focus wajib diisi!" }}
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
								>
									Cancel
								</Button>
								<Button
									className="col-span-2"
									type="submit"
									size="lg"
									isLoading={isPending}
								>
									{isPending ? "Saving Concern..." : "Save Update Concern"}
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
