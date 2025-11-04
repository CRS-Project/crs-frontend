import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
import type * as React from "react";
import clsxm from "@/lib/clsxm";
import { TFilter } from "./TFilter";

type THeadProps<T extends RowData> = {
	table: Table<T>;
	sortable: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default function THead<T extends RowData>({
	table,
	sortable,
	...rest
}: THeadProps<T>) {
	return (
		<thead className="bg-gray-50" {...rest}>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((header) => (
						<th
							key={header.id}
							onClick={header.column.getToggleSortingHandler()}
							className={clsxm(sortable && "hover:cursor-pointer", "text-left")}
						>
							<div className="relative flex items-center justify-start gap-2 px-4 py-3">
								{header.isPlaceholder ? null : (
									<p className="text-start text-sm font-medium text-gray-700">
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</p>
								)}
								{sortable && !header.column.getCanSort() ? (
									<ArrowDown className="invisible size-4" />
								) : (
									{
										asc: (
											<ArrowDown className="size-4 rotate-180 text-gray-400" />
										),
										desc: <ArrowDown className="size-4 text-gray-400" />,
									}[(header.column.getIsSorted() as string) ?? null]
								)}
							</div>
							{header.column.getCanFilter() ? (
								<div className="px-4 pb-2">
									<TFilter column={header.column} />
								</div>
							) : null}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
}
