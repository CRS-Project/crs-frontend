import type { Column } from "@tanstack/react-table";
import * as React from "react";

// biome-ignore lint/suspicious/noExplicitAny: add definition later
export function TFilter({ column }: { column: Column<any, unknown> }) {
	const columnFilterValue = column.getFilterValue();

	return (
		<DebouncedInput
			className="rounded border shadow"
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Cari data...`}
			type="text"
			value={(columnFilterValue ?? "") as string}
		/>
	);
}

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value, onChange, debounce]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			className="mb-2 w-[85%] rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	);
}
