"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion, useDragControls } from "framer-motion";
import { ArrowLeft, File, X } from "lucide-react";
import * as React from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import ForgetPasswordPage from "@/app/(auth)/forgot-password/page";
import useAuthStore from "@/app/stores/useAuthStore";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import UploadFile from "@/components/form/UploadFile";
import ButtonLink from "@/components/links/ButtonLink";
import type { EditUserRequest, User } from "@/types/user";
import { useEditUserMutation } from "../../_hooks/useEditUserMutation";

interface EditUserModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function EditUserModal({ isOpen, onClose }: EditUserModalProps) {
	const { user } = useAuthStore();
	const [selectedForm, setSelectedForm] = React.useState<"EDIT" | "PASSWORD">(
		"EDIT",
	);

	const methods = useForm<User>({
		mode: "onTouched",
	});

	React.useEffect(() => {
		if (user) {
			methods.reset({
				name: user.name ?? "",
				email: user.email ?? "",
				initial: user.initial ?? "",
				institution: user.institution ?? "",
				role: user.role ?? "",
				discipline_number: user.discipline_number ?? 0,
				photo_profile: user.photo_profile ?? "",
				package_id: user.package_id ?? "",
				discipline_id: user.discipline_id ?? "",
			});
		}
	}, [user, methods]);

	const { handleSubmit, reset } = methods;

	const { mutate, isPending } = useEditUserMutation({
		onSuccess: () => {
			onClose();
			reset();
		},
		id: user?.id ?? "",
	});

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
	const passwordSheetRef = React.useRef<HTMLDivElement | null>(null);
	const passwordDragControls = useDragControls();

	const onSubmit: SubmitHandler<User> = (formData) => {
		const filteredData: EditUserRequest = {
			name: formData.name ?? user?.name ?? "",
			email: formData.email ?? user?.email ?? "",
			initial: formData.initial ?? user?.initial ?? "",
			photo_profile: formData.photo_profile ?? user?.photo_profile ?? "",
			institution: user?.institution ?? "",
			discipline_number: user?.discipline_number ?? 0,
			password: formData.password ?? "",
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
									id="email"
									type="email"
									label="Email"
									placeholder="Input User Email"
									validation={{ required: "Email wajib diisi!" }}
								/>
								<Input
									id="initial"
									label="Initial"
									placeholder="Input Initial Account"
									helperText="Example: CRS"
									validation={{ required: "Initial wajib diisi!" }}
								/>
								<SelectInput
									id="role"
									label="Role"
									options={roleOptions}
									placeholder="Select User Role"
									readOnly
									disabled
								/>
								<Input
									id="password"
									label="Password"
									placeholder="Input New Password"
									type="password"
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
										Update Profile
									</Button>
								</div>
							</form>
						</FormProvider>
					</div>
				</motion.div>

				{/* Forgot Password Modal - Mobile */}
				{selectedForm === "PASSWORD" && (
					<>
						<motion.div
							className="fixed inset-0 z-[2002] bg-black/40"
							onClick={() => setSelectedForm("EDIT")}
						/>
						<motion.div
							drag="y"
							dragControls={passwordDragControls}
							dragListener={false}
							dragConstraints={{ top: 0, bottom: 0 }}
							onDragEnd={(_e, info) => {
								if (info.offset.y > 120 || info.velocity.y > 800) {
									setSelectedForm("EDIT");
								}
							}}
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							exit={{ y: "100%" }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							ref={passwordSheetRef}
							className="fixed bottom-0 left-0 right-0 z-[2003] rounded-t-2xl bg-white shadow-xl max-h-[85vh] overflow-auto"
						>
							<div className="px-4 py-3">
								<div
									className="mx-auto h-0.5 w-12 bg-slate-200 rounded mb-3"
									onPointerDown={(e) => passwordDragControls.start(e as any)}
								/>
								<div className="flex items-center justify-between">
									<IconButton
										variant="ghost"
										onClick={() => setSelectedForm("EDIT")}
										icon={ArrowLeft}
										className="w-8 h-8 rounded-full"
										iconClassName="w-6 h-6 text-[#3F3F46]"
									/>
									<h3 className="text-lg font-semibold">Reset Password</h3>
									<IconButton
										variant="ghost"
										onClick={() => setSelectedForm("EDIT")}
										icon={X}
										className="w-8 h-8 rounded-full"
										iconClassName="w-6 h-6 text-[#3F3F46]"
									/>
								</div>
							</div>
							<div className="px-4 py-6">
								<ForgetPasswordPage />
							</div>
						</motion.div>
					</>
				)}
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
				{selectedForm === "EDIT" ? (
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
								Edit New User
							</h2>
						</div>

						<FormProvider {...methods}>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="my-8 space-y-2"
							>
								<Input
									id="name"
									label="Full Name"
									placeholder="Input User Full Name"
									validation={{ required: "Full Name wajib diisi!" }}
								/>
								<Input
									id="email"
									type="email"
									label="Email"
									placeholder="Input User Email"
									validation={{ required: "Email wajib diisi!" }}
								/>
								<Input
									id="initial"
									label="Initial"
									placeholder="Input Initial Account"
									helperText="Example: CRS"
									validation={{ required: "Initial wajib diisi!" }}
								/>
								<SelectInput
									id="role"
									label="Role"
									options={roleOptions}
									placeholder="Select User Role"
									readOnly
									disabled
								/>
								<Input
									id="password"
									label="Password"
									placeholder="Input New Password"
									type="password"
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
										Update Profile
									</Button>
								</div>
							</form>
						</FormProvider>
					</motion.div>
				) : (
					<div className="w-3/4 flex items-center justify-center h-full mx-auto">
						<div className="flex flex-col justify-center">
							<ForgetPasswordPage />
							<button
								type="button"
								className="text-sm mt-6 hover:underline flex justify-center items-center cursor-pointer"
								onClick={() => setSelectedForm("EDIT")}
							>
								<ArrowLeft className="mr-2 text-xl font-bold" />
								Back to Edit Data
							</button>
						</div>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
}

const roleOptions = [
	{ value: "CONTRACTOR", label: "Contractor" },
	{ value: "REVIEWER", label: "Reviewer" },
	{ value: "SUPER ADMIN", label: "Super Admin" },
];
