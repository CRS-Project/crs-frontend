"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import SelectInput from "@/components/form/SelectInput";
import TextArea from "@/components/form/TextArea";
import type { Concern, EditConcernRequest } from "@/types/concern";
import { useEditConcernMutation } from "../_hooks/useEditConcernMutation";
import { useGetConcernByIDQuery } from "../_hooks/useGetConcernByIDQuery";

interface EditConcernModalProps {
	concern: Concern | null;
	isOpen: boolean;
	onClose: () => void;
	packageId: string;
	userDiscipline: { id: string; name: string }[];
}

export default function EditConcernModal({
	isOpen,
	onClose,
	concern,
	packageId,
	userDiscipline,
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

	const { handleSubmit, reset, watch } = methods;

	const selectedDisciplineName = watch("user_discipline");

	const { mutate, isPending } = useEditConcernMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		id: concern?.id ?? "",
		packageId,
	});

	const onSubmit: SubmitHandler<EditConcernRequest> = (data) => {
		mutate(data);
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

	if (isMobile) {
		return isOpen ? (
			<>
				<motion.div
					className="fixed inset-0 z-[2000] bg-black/40"
					onClick={() => {
						onClose();
						reset();
					}}
				/>
				<motion.div
					drag="y"
					dragControls={dragControls}
					dragListener={false}
					dragConstraints={{ top: 0, bottom: 0 }}
					onDragEnd={(_e, info) => {
						if (info.offset.y > 120 || info.velocity.y > 800) {
							onClose();
							reset();
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
							<h3 className="text-lg font-semibold">Edit Concern</h3>
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
						</div>
					</div>
					<div className="px-4 py-6">
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								<SelectInput
									id="user_discipline_id"
									label="Discipline"
									placeholder={selectedDisciplineName}
									validation={{ required: "Discipline wajib diisi!" }}
									options={userDiscipline.map((d) => ({
										value: d.id,
										label: d.name,
									}))}
								/>
								<TextArea
									id="review_focus"
									label="Review Focus"
									placeholder="Input Review Focus"
									rows={8}
									validation={{ required: "Review Focus wajib diisi!" }}
								/>
								<div className="grid grid-cols-3 py-4 gap-3">
									<Button
										variant="secondary"
										size="lg"
										onClick={() => {
											onClose();
											reset();
										}}
									>
										Cancel
									</Button>
									<Button className="col-span-2" type="submit" size="lg">
										Save Update Concern
									</Button>
								</div>
							</form>
						</FormProvider>
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
							<SelectInput
								id="user_discipline_id"
								label="Discipline"
								placeholder={selectedDisciplineName}
								validation={{ required: "Discipline wajib diisi!" }}
								options={userDiscipline.map((d) => ({
									value: d.id,
									label: d.name,
								}))}
							/>
							<TextArea
								id="review_focus"
								label="Review Focus"
								placeholder="Input Review Focus"
								rows={6}
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
