import * as React from "react";
import { get, type RegisterOptions, useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/form/ErrorMessage";
import HelperText from "@/components/form/HelperText";
import LabelText from "@/components/form/LabelText";
import clsxm from "@/lib/clsxm";

export type DateInputProps = {
	id: string;
	label?: string;
	helperText?: React.ReactNode;
	helperTextClassName?: string;
	hideError?: boolean;
	validation?: RegisterOptions;
	labelTextClasname?: string;
	errorMessageClassName?: string;
	"data-cy"?: string;
} & Omit<React.ComponentPropsWithoutRef<"input">, "type">;

export default function DateInput({
	id,
	label,
	helperText,
	hideError = false,
	validation,
	className,
	labelTextClasname,
	helperTextClassName,
	errorMessageClassName,
	"data-cy": dataCy,
	...rest
}: DateInputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const error = get(errors, id);

	const { ref: registerRef, ...fieldProps } = register(id, validation);

	const handleRef = (element: HTMLInputElement | null) => {
		inputRef.current = element;
		if (typeof registerRef === "function") {
			registerRef(element);
		}
	};

	return (
		<div className="w-full space-y-2">
			{label && (
				<LabelText
					required={!!validation?.required}
					labelTextClasname={labelTextClasname}
				>
					{label}
				</LabelText>
			)}

			<div className="relative">
				<input
					{...fieldProps}
					ref={handleRef}
					type="datetime-local"
					id={id}
					name={id}
					className={clsxm(
						"h-full w-full rounded-md border border-gray-500 bg-white px-3 py-2.5 text-sm text-gray-900",
						"appearance-none focus:border-primary-500 focus:outline-1 focus:outline-gray-900 focus:ring-inset",
						"placeholder:text-sm placeholder:text-gray-500 hover:ring-1 hover:ring-inset hover:ring-gray-900",
						error &&
							"border-none ring-2 ring-inset ring-red-500 placeholder:text-gray-500 focus:ring-red-500 bg-red-100",
						className,
					)}
					data-cy={dataCy}
					{...rest}
				/>

				{/* <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
          onClick={() => inputRef.current?.showPicker?.()}
          tabIndex={-1}
        >
          <Calendar className="h-5 w-5" />
        </button> */}
			</div>

			{!hideError && error && (
				<ErrorMessage className={errorMessageClassName}>
					{error.message}
				</ErrorMessage>
			)}
			{helperText && (
				<HelperText className={helperTextClassName}>{helperText}</HelperText>
			)}
		</div>
	);
}
