"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack, IoIosLock } from "react-icons/io";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import { useForgotPassword } from "@/hooks/useAuth";
import Authentication from "@/layouts/Authentication";
import type { ForgotPasswordRequest } from "@/types/reset";

export default function ForgetPasswordPage() {
  const methods = useForm<ForgotPasswordRequest>();
  const router = useRouter();

  const mutation = useForgotPassword({
    onSuccess: () => {
      toast.success("Password reset instructions sent!");
      methods.reset();
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Forgot Password error:", error);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordRequest> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Authentication>
      <div className="flex flex-col justify-center items-center text-center">
        <IoIosLock className="text-[50px]" />
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
            id="email"
            label="Email"
            placeholder="Your Email"
            validation={{ required: "Email is required" }}
          />
          <Button className="w-full text-sm mt-3" variant="blue" type="submit">
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
