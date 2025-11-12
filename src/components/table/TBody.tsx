import { flexRender, type RowData, type Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import type * as React from "react";
import clsxm from "@/lib/clsxm";

type TBodyProps<T extends RowData> = {
	table: Table<T>;
	isLoading: boolean;
	redirection?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function TBody<T extends RowData>({
	table,
	isLoading,
	redirection,
	...rest
}: TBodyProps<T>) {
	const router = useRouter();

	const handleRowClick = (row: T) => {
		if (redirection) {
			const baseRedirect = redirection.endsWith("/")
				? redirection.slice(0, -1)
				: redirection;
			router.push(`${baseRedirect}/${(row as any).id}`);
		}
	};

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
							redirection ? "cursor-pointer" : "",
						)}
						onClick={() => handleRowClick(row.original)}
					>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className="px-4 py-3">
								<p className="text-sm text-[#11181C]">
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
