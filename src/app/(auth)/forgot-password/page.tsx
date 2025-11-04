"use client";

import Link from "next/link";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Authentication from "@/layouts/Authentication";
import parseToFormData from "@/lib/utils";
import type { ForgotPasswordRequest } from "@/types/reset";

export default function ForgetPasswordPage() {
  const methods = useForm<ForgotPasswordRequest>();

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Authentication>
      <div className="flex flex-col justify-center items-center text-center">
        <LockKeyhole className="text-[50px]" />
        <h2 className="text-[36px] font-bold">Forgot Password?</h2>
        <p className="font-light text-[15.5px]">
          Please enter your email recover, we’ll send you reset instructions{" "}
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          className="space-y-4 mt-[22px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input
            id="usernameEmail"
            label="Email/Username"
            placeholder="Your Email"
            validation={{ required: "Email/Username is required" }}
          />
          <Button
            className="w-full text-sm mt-3"
            variant="blue"
            type="submit"
            size="lg"
          >
            Send
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
