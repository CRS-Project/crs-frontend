"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
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

	const methods = useForm<EditUserRequest>({
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

	const onSubmit: SubmitHandler<EditUserRequest> = (data) => {
		const filteredData = {
			name: data.name,
			email: data.email,
			initial: data.initial,
			role: user?.role ?? "",
			photo_profile: data.photo_profile,
			package_id: user?.package_id ?? "",
			discipline_id: user?.discipline_id ?? "",
			institution: user?.institution ?? "",
			discipline_number: user?.discipline_number ?? 0,
		};

		mutate(filteredData);
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
								<LabelText>Password</LabelText>
								<Button
									className="w-full"
									size="lg"
									variant="yellow"
									onClick={() => setSelectedForm("PASSWORD")}
								>
									Reset Password
								</Button>
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
