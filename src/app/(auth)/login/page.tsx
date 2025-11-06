"use client";

import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import type { LoginRequest } from "@/types/login";
import useLoginMutation from "./_hooks/useLoginMutation";

export default function LoginPage() {
	const methods = useForm<LoginRequest>({
		mode: "onChange",
	});

	const { handleSubmit } = methods;

	const { mutate, isPending } = useLoginMutation();

	const onSubmit = (data: LoginRequest) => {
		mutate(data);
	};

	//   const mutation = useLogin({
	//     onSuccess: () => {
	//       toast.success("Logged in successfully!");
	//       methods.reset();
	//       router.push("/home");
	//     },
	//     onError: (error) => {
	//       toast.error(error.message);
	//       console.error("Login error:", error);
	//     },
	//   });

	//   const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
	//     await mutation.mutateAsync(data);
	//   };

	return (
		<>
			<div className="flex flex-col justify-center items-center">
				<h2 className="text-[36px] font-bold">WELCOME BACK</h2>
				<p className="font-light text-[15.5px]">Sign in to start using CSR</p>
			</div>
			<FormProvider {...methods}>
				<form className="space-y-4 mt-[22px]" onSubmit={handleSubmit(onSubmit)}>
					<Input
						id="email"
						label="Email/Username"
						placeholder="Your Email"
						validation={{ required: "Email is required" }}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						placeholder="Introduce your password"
						validation={{ required: "Password is required" }}
					/>
					<div className="w-full text-right">
						<Link
							href="/forgot-password"
							className="text-sm hover:text-slate-500 transition-all duration-200 ease-in-out"
						>
							Forgot your password?
						</Link>
					</div>
					<Button
						className="w-full text-sm mt-3"
						variant="blue"
						type="submit"
						isLoading={isPending}
					>
						Submit
					</Button>
				</form>
			</FormProvider>
		</>
	);
}
