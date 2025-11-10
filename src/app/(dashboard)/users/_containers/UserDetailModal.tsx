"use client";

import { Modal, ModalContent } from "@heroui/modal";
import { motion } from "framer-motion";
import { File, X } from "lucide-react";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import Input from "@/components/form/Input";
import LabelText from "@/components/form/LabelText";
import SelectInput from "@/components/form/SelectInput";
import ButtonLink from "@/components/links/ButtonLink";
import type { User } from "@/types/user";
import { useGetUserByIDQuery } from "../_hooks/useGetUserByIDQuery";

interface UserDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	user: User | null;
}

export default function UserDetailModal({
	isOpen,
	onClose,
	user,
}: UserDetailModalProps) {
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
							Detail Data User
						</h2>
					</div>

					<FormProvider {...methods}>
						<div className="my-8 space-y-2">
							<Input
								id="name"
								label="Full Name"
								placeholder="Input User Full Name"
								readOnly
							/>
							<Input
								id="email"
								type="email"
								label="Email"
								placeholder="Input User Email"
								readOnly
							/>
							<Input
								id="initial"
								label="Initial"
								placeholder="Input Initial Account"
								readOnly
							/>
							<Input
								id="institution"
								label="Institution"
								placeholder="Input Institution"
								readOnly
							/>
							{user?.role === "REVIEWER" && (
								<Input
									id="discipline"
									label="Discipline"
									placeholder="Input Discipline"
									readOnly
								/>
							)}
							<Input
								id="discipline_number"
								label="Number Discipline"
								placeholder="Input Number Discipline"
								readOnly
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
								id="package"
								label="Package"
								placeholder="Select User Package"
								readOnly
							/>
							<Input
								id="password"
								type="password"
								label="Password"
								placeholder="Input Password Account"
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

const roleOptions = [
	{ value: "CONTRACTOR", label: "Contractor" },
	{ value: "REVIEWER", label: "Reviewer" },
];
