"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { File, X } from "lucide-react";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import ButtonLink from "@/components/links/ButtonLink";
import type { EditUserRequest, User } from "@/types/user";
import { useEditUserMutation } from "../../_hooks/useEditUserMutation";
import { useDeleteUserMutation } from "../_hooks/useDeleteUserMutation";
import { useGetUserByIDQuery } from "../_hooks/useGetUserByIDQuery";

interface EditUserModalProps {
	user: User | null;
	isOpen: boolean;
	onClose: () => void;
	disciplineOptions: { value: string; label: string }[];
	isLoadingDisciplines: boolean;
}

export default function EditUserModal({
	isOpen,
	onClose,
	user,
	disciplineOptions = [],
	isLoadingDisciplines = false,
}: EditUserModalProps) {
	const { data } = useGetUserByIDQuery(user?.id ?? "");
	const methods = useForm<User>({
		mode: "onTouched",
		defaultValues: data?.data,
	});

	React.useEffect(() => {
		if (data?.data) {
			methods.reset(data.data);
		}
	}, [data, methods]);

	const { handleSubmit, reset, watch } = methods;

	const role = watch("role");
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

	const { mutate, isPending } = useEditUserMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		id: user?.id ?? "",
	});

	const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation({
		onSuccess: () => {
			onClose();
		},
	});

	const onSubmit: SubmitHandler<User> = (formData) => {
		const filteredData: EditUserRequest = {
			name: formData.name ?? data.name,
			email: formData.email ?? data.email,
			initial: formData.initial ?? data.initial,
			photo_profile: formData.photo_profile ?? data.photo_profile,
			institution: formData.institution ?? user?.institution ?? "",
			discipline_number:
				formData.discipline_number ?? user?.discipline_number ?? 0,
			password: formData.password ?? undefined,
		};

		if (user?.role === "REVIEWER") {
			filteredData.discipline_id =
				formData.discipline_id ?? user?.discipline_id ?? "";
		}

		mutate(filteredData);
	};

	return isMobile ? (
		isOpen ? (
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
							<h3 className="text-lg font-semibold">Edit User</h3>
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
								<SelectInput
									id="role"
									label="Role"
									options={roleOptions}
									placeholder="Select User Role"
									disabled
									readOnly
								/>
								<Input
									id="password"
									label="Password"
									placeholder="Input User Password"
									type="password"
								/>
								<Input
									id="package"
									label="Package"
									placeholder="Select User Package"
									readOnly
								/>

								<LabelText>Profile Picture</LabelText>
								<ButtonLink
									href={`https://${user?.photo_profile ?? ""}`}
									className="w-full"
									variant="secondary"
									leftIcon={File}
								>
									Open File
								</ButtonLink>
								<UploadFile
									id="photo_profile"
									label=""
									maxSize={1000 * 1024}
									accept={{
										"image/*": [".jpg", ".jpeg", ".png"],
										"application/pdf": [".pdf"],
									}}
									maxFiles={1}
									uploadToApi
									helperText="Max. size picture 1mb"
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
										Save Update Profile
									</Button>
									<Button
										className="col-span-3"
										variant="red"
										size="lg"
										isLoading={isDeleting}
										onClick={() => deleteUser(user?.id ?? "")}
									>
										Delete Account
									</Button>
								</div>
							</form>
						</FormProvider>
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
								reset();
							}}
							icon={X}
							className="w-8 h-8 rounded-full"
							iconClassName="w-6 h-6 text-[#3F3F46]"
						/>
						<h2 className="text-2xl font-bold text-[#52525B]">Edit User</h2>
					</div>

					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)} className="my-8 space-y-2">
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
							<SelectInput
								id="role"
								label="Role"
								options={roleOptions}
								placeholder="Select User Role"
								disabled
								readOnly
							/>
							<Input
								id="password"
								label="Password"
								placeholder="Input User Password"
								type="password"
							/>
							<Input
								id="package"
								label="Package"
								placeholder="Select User Package"
								readOnly
							/>

							<LabelText>Profile Picture</LabelText>
							<ButtonLink
								href={`https://${user?.photo_profile ?? ""}`}
								className="w-full"
								variant="secondary"
								leftIcon={File}
							>
								Open File
							</ButtonLink>
							<UploadFile
								id="photo_profile"
								label=""
								maxSize={1000 * 1024}
								accept={{
									"image/*": [".jpg", ".jpeg", ".png"],
									"application/pdf": [".pdf"],
								}}
								maxFiles={1}
								uploadToApi
								helperText="Max. size picture 1mb"
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
									Save Update Profile
								</Button>
								<Button
									className="col-span-3"
									variant="red"
									size="lg"
									isLoading={isDeleting}
									onClick={() => deleteUser(user?.id ?? "")}
								>
									Delete Account
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
