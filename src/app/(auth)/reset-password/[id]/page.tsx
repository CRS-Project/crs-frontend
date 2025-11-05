"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack, IoIosLock } from "react-icons/io";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { useResetPassword } from "@/hooks/useAuth";
import Authentication from "@/layouts/Authentication";
import parseToFormData from "@/lib/utils";
import type { ResetPasswordRequest } from "@/types/reset";

export default function RegisterPage() {
	const methods = useForm<ResetPasswordRequest>();
	const router = useRouter();

	const mutation = useResetPassword({
		onSuccess: () => {
			toast.success("Password has been reset successfully!");
			methods.reset();
			router.push("/login");
		},
		onError: (error) => {
			toast.error(error.message);
			console.error("Reset Password error:", error);
		},
	});

	const onSubmit: SubmitHandler<ResetPasswordRequest> = async (data) => {
		console.log(data);
		const formData = parseToFormData(data);
		await mutation.mutateAsync(formData);
	};

	return (
		<Authentication>
			<div className="flex flex-col justify-center items-center text-center">
				<IoIosLock className="text-[50px]" />
				<h2 className="text-[36px] font-bold">Reset Password!</h2>
				<p className="font-light text-[15.5px]">
					Please set your new password{" "}
				</p>
			</div>
			<FormProvider {...methods}>
				<form
					className="space-y-4 mt-[22px]"
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<Input
						id="newPassword"
						type="password"
						label="New Password"
						placeholder="Your New Password"
						validation={{
							required: "New Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters long",
							},
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
								message:
									"Password must contain both uppercase and lowercase letters",
							},
						}}
					/>
					<Input
						id="confirmNewPassword"
						type="password"
						label="Confirm Password"
						placeholder="Confirm New Password"
						validation={{
							required: "Confirm Password is required",
							validate: (value: string) => {
								const newPassword = methods.getValues("newPassword");
								return value === newPassword || "Passwords do not match";
							},
						}}
					/>
					<Button className="w-full text-sm mt-3" variant="blue" type="submit">
						Reset Password
					</Button>
				</form>
				<Link
					href="/login"
					className="text-sm mt-6 hover:underline flex justify-center items-center"
				>
					<IoIosArrowRoundBack className="mr-2 text-xl font-bold" />
					Back to Login
				</Link>
			</FormProvider>
		</Authentication>
	);
}
