"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import type { CreateUserRequest } from "@/types/user";
import { useCreateUserMutation } from "../_hooks/useCreateUserMutation";

interface CreateUserModalProps {
	isOpen: boolean;
	onClose: () => void;
	packageOptions: { value: string; label: string }[];
	disciplineOptions: { value: string; label: string }[];
	isLoadingPackages: boolean;
	isLoadingDisciplines: boolean;
}

export default function CreateUserModal({
	isOpen,
	onClose,
	packageOptions = [],
	disciplineOptions = [],
	isLoadingPackages = false,
	isLoadingDisciplines = false,
}: CreateUserModalProps) {
	const methods = useForm<CreateUserRequest>({
		mode: "onTouched",
	});

	const { handleSubmit, reset, watch } = methods;

	const role = watch("role");

	const { mutate, isPending } = useCreateUserMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
	});

	const onSubmit: SubmitHandler<CreateUserRequest> = (data) => {
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
						<h2 className="text-2xl font-bold text-[#52525B]">
							Create New User
						</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
							<SelectInput
								id="role"
								label="Role"
								options={roleOptions}
								placeholder="Select User Role"
								validation={{ required: "Role wajib diisi!" }}
							/>
							<SelectInput
								id="package_id"
								label="Package"
								options={packageOptions}
								isLoading={isLoadingPackages}
								placeholder="Select User Package"
								validation={{ required: "Package wajib diisi!" }}
							/>
							<Input
								id="name"
								label="Full Name"
								placeholder="Input User Full Name"
								validation={{ required: "Full Name wajib diisi!" }}
							/>
							<Input
								id="initial"
								label="Initial"
								placeholder="Input Initial Account"
								helperText="Example: CRS"
								validation={{ required: "Initial wajib diisi!" }}
							/>
							<Input
								id="email"
								type="email"
								label="Email"
								placeholder="Input User Email"
								validation={{ required: "Email wajib diisi!" }}
							/>
							<Input
								id="institution"
								label="Institution"
								placeholder="Input Institution"
								validation={{ required: "Institution wajib diisi!" }}
							/>
							{role === "REVIEWER" && (
								<SelectInput
									id="discipline_id"
									label="Discipline"
									placeholder="Input Discipline"
									options={disciplineOptions}
									isLoading={isLoadingDisciplines}
									validation={
										role === "REVIEWER"
											? { required: "Discipline wajib diisi!" }
											: undefined
									}
								/>
							)}
							<Input
								id="discipline_number"
								label="Number Discipline"
								placeholder="Input Number Discipline User"
								validation={{
									required: "Number Discipline wajib diisi!",
									valueAsNumber: true,
								}}
							/>
							<Input
								id="password"
								type="password"
								label="Password"
								placeholder="Input Password Account"
								helperText="Password must be 8 character, mix uppercase and lowercase"
								validation={{ required: "Password wajib diisi!" }}
							/>
							<UploadFile
								id="photo_profile"
								label="Profile Picture"
								maxSize={1000 * 1024}
								accept={{
									"image/*": [".jpg", ".jpeg", ".png"],
									"application/pdf": [".pdf"],
								}}
								maxFiles={1}
								uploadToApi
								helperText="Max. size picture 1mb"
								validation={{ required: "Profile picture wajib diisi!" }}
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
									rightIcon={Plus}
									type="submit"
									isLoading={isPending}
								>
									Create New User
								</Button>
							</div>
						</form>
					</FormProvider>
				</motion.div>
			</ModalContent>
		</Modal>
	);
}

const roleOptions = [
	{ value: "CONTRACTOR", label: "Contractor" },
	{ value: "REVIEWER", label: "Reviewer" },
];
