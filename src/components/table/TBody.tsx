import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import type * as React from "react";
import clsxm from "@/lib/clsxm";

type TBodyProps<T extends RowData> = {
	table: Table<T>;
	isLoading: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export default function TBody<T extends RowData>({
	table,
	isLoading,
	...rest
}: TBodyProps<T>) {
	return (
		<tbody {...rest}>
			{isLoading ? (
				<tr>
					<td colSpan={table.getAllLeafColumns().length}>
						<p className="py-8 text-center text-gray-500">Memuat...</p>
					</td>
				</tr>
			) : table.getRowModel().rows.length === 0 ? (
				<tr>
					<td colSpan={table.getAllLeafColumns().length}>
						<p className="py-8 text-center text-gray-500">Tidak ada data</p>
					</td>
				</tr>
			) : (
				table.getRowModel().rows.map((row, index) => (
					<tr
						key={row.id}
						className={clsxm(
							"hover:bg-gray-50",
							index % 2 === 0 ? "bg-white" : "bg-gray-50/30",
						)}
					>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className="px-4 py-3">
								<p className="text-sm text-gray-900">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</p>
							</td>
						))}
					</tr>
				))
			)}
		</tbody>
	);
}
