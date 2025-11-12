"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import ConsolidatorChip from "@/components/chip/ConsolidatorChip";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import type { AreaOfConcern, EditAreaOfConcernRequest } from "@/types/concern";
import type { ConsolidatorUser } from "@/types/consolidator";
import { useGetConsolidatorOption } from "../_hooks/useConsolidatorQuery";
import { useEditAreaOfConcernMutation } from "../_hooks/useEditAreaOfConcernMutation";

interface EditAreaOfConcernModalProps {
	concern: AreaOfConcern | null;
	isOpen: boolean;
	onClose: () => void;
	packageId: string;
}

export default function EditAreaOfConcernModal({
	isOpen,
	onClose,
	concern,
	packageId,
}: EditAreaOfConcernModalProps) {
	const { id_concern } = useParams();
	const { data: consolidatorOptions } = useGetConsolidatorOption(packageId);

	const { mutate: editAreaOfConcern, isPending } = useEditAreaOfConcernMutation(
		{
			area_of_concern_group_id: id_concern as string,
			area_of_concern_id: concern?.id || "",
			onSuccess: () => {
				handleClose();
			},
		},
	);

	const methods = useForm<EditAreaOfConcernRequest>({
		mode: "onTouched",
		defaultValues: {
			area_of_concern_id: concern?.area_of_concern_id || "",
			description: concern?.description || "",
			consolidators:
				concern?.consolidators?.map((c) => ({ user_id: c.id, name: c.name })) ||
				[],
		},
	});

	React.useEffect(() => {
		if (concern) {
			methods.reset({
				area_of_concern_id: concern.area_of_concern_id,
				description: concern.description,
				consolidators:
					concern.consolidators?.map((c) => ({
						user_id: c.id,
						name: c.name,
					})) || [],
			});
			setSelectedConsolidators(
				concern.consolidators?.map((c) => ({ user_id: c.id, name: c.name })) ||
					[],
			);
		}
	}, [concern, methods]);

	const { handleSubmit, reset, setValue, watch } = methods;

	const [selectedConsolidators, setSelectedConsolidators] = React.useState<
		ConsolidatorUser[]
	>(
		concern?.consolidators?.map((c) => ({ user_id: c.id, name: c.name })) || [],
	);
	const selectedUserId = watch("consolidator_select") || "";

	const addConsolidator = () => {
		if (
			selectedUserId &&
			!selectedConsolidators.find((c) => c.user_id === selectedUserId)
		) {
			const user = consolidatorOptions?.user.find(
				(u: any) => u.value === selectedUserId,
			);
			const newConsolidator: ConsolidatorUser = {
				user_id: String(selectedUserId),
				name: user?.label,
			};
			const updated = [...selectedConsolidators, newConsolidator];
			setSelectedConsolidators(updated);
			setValue("consolidators", updated);
			setValue("consolidator_select", "");
		}
	};

	const removeConsolidator = (userId: string) => {
		const updated = selectedConsolidators.filter((c) => c.user_id !== userId);
		setSelectedConsolidators(updated);
		setValue("consolidators", updated);
	};

	const onSubmit: SubmitHandler<EditAreaOfConcernRequest> = (data) => {
		const requestBody: EditAreaOfConcernRequest = {
			package_id: packageId,
			area_of_concern_id: data.area_of_concern_id,
			description: data.description,
			consolidators: data.consolidators.map((c) => ({ user_id: c.user_id })),
		};

		editAreaOfConcern(requestBody);
	};

	const handleClose = () => {
		onClose();
		reset();
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
					onClick={handleClose}
				/>
				<motion.div
					drag="y"
					dragControls={dragControls}
					dragListener={false}
					dragConstraints={{ top: 0, bottom: 0 }}
					onDragEnd={(_e, info) => {
						if (info.offset.y > 120 || info.velocity.y > 800) {
							handleClose();
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
							<h3 className="text-lg font-semibold">Edit Area of Concern</h3>
							<IconButton
								variant="ghost"
								onClick={handleClose}
								icon={X}
								className="w-8 h-8 rounded-full"
								iconClassName="w-6 h-6 text-[#3F3F46]"
							/>
						</div>
					</div>
					<div className="px-4 py-6">
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								<Input
									id="area_of_concern_id"
									label="Area of Concern ID"
									placeholder="Input Area of Concern ID"
									validation={{ required: "Area of Concern ID is required!" }}
								/>
								<Input
									id="description"
									label="Name Area of Concern"
									placeholder="Input Name"
									validation={{ required: "Name is required!" }}
								/>

								<div className="space-y-2">
									<LabelText required>Consolidator</LabelText>
									<div className="flex gap-2">
										<div className="flex-1">
											<SelectInput
												id="consolidator_select"
												label={null}
												placeholder="Add Consolidator"
												options={consolidatorOptions?.user || []}
												isClearable={false}
												isSearchable={true}
											/>
										</div>
										<Button
											type="button"
											variant="blue"
											onClick={addConsolidator}
											className="whitespace-nowrap"
										>
											Add
										</Button>
									</div>
									<div className="flex flex-wrap gap-2 mt-2">
										{selectedConsolidators.map((consolidator) => (
											<div
												key={consolidator.user_id}
												className="relative group"
											>
												<ConsolidatorChip
													name={consolidator.name || consolidator.user_id}
												/>
												<button
													type="button"
													onClick={() =>
														removeConsolidator(consolidator.user_id)
													}
													className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
												>
													×
												</button>
											</div>
										))}
									</div>
								</div>

								<div className="grid grid-cols-3 py-4 gap-3">
									<Button
										variant="secondary"
										size="lg"
										onClick={handleClose}
										disabled={isPending}
									>
										Cancel
									</Button>
									<Button
										className="col-span-2"
										type="submit"
										size="lg"
										disabled={isPending}
									>
										{isPending ? "Saving..." : "Save Update"}
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
							onClick={handleClose}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">
							Edit Area of Concern
						</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-4">
							<Input
								id="area_of_concern_id"
								label="Area of Concern ID"
								placeholder="Input Area of Concern ID"
								validation={{ required: "Area of Concern ID is required!" }}
							/>
							<Input
								id="description"
								label="Name Area of Concern"
								placeholder="Input Name"
								validation={{ required: "Name is required!" }}
							/>

							<div className="space-y-2">
								<LabelText required>Consolidator</LabelText>
								<div className="flex gap-2">
									<div className="flex-1">
										<SelectInput
											id="consolidator_select"
											label={null}
											placeholder="Add Consolidator"
											options={consolidatorOptions?.user || []}
											isClearable={false}
											isSearchable={true}
										/>
									</div>
									<Button
										type="button"
										variant="blue"
										onClick={addConsolidator}
										className="whitespace-nowrap"
									>
										Add
									</Button>
								</div>
								<div className="flex flex-wrap gap-2 mt-2">
									{selectedConsolidators.map((consolidator) => (
										<div key={consolidator.user_id} className="relative group">
											<ConsolidatorChip
												name={consolidator.name || consolidator.user_id}
											/>
											<button
												type="button"
												onClick={() => removeConsolidator(consolidator.user_id)}
												className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
											>
												×
											</button>
										</div>
									))}
								</div>
							</div>

							<div className="grid grid-cols-3 py-8 gap-3">
								<Button
									variant="secondary"
									size="lg"
									onClick={handleClose}
									disabled={isPending}
								>
									Cancel
								</Button>
								<Button
									className="col-span-2"
									type="submit"
									size="lg"
									disabled={isPending}
								>
									{isPending ? "Saving..." : "Save Update"}
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}
