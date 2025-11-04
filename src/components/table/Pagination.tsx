import type { RowData, Table } from "@tanstack/react-table";
import type * as React from "react";

type PaginationProps<T extends RowData> = {
	table: Table<T>;
} & React.ComponentPropsWithoutRef<"div">;

export default function Pagination<T extends RowData>({
	table,
	...rest
}: PaginationProps<T>) {
	const pageCount = table.getPageCount();
	const currentPage = table.getState().pagination.pageIndex;

	const renderPageButtons = () => {
		const buttons = [];

		if (pageCount <= 7) {
			for (let i = 0; i < pageCount; i++) {
				buttons.push(
					<button
						type="button"
						key={i}
						onClick={() => table.setPageIndex(i)}
						className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
							currentPage === i
								? "bg-emerald-600 text-white hover:bg-emerald-700"
								: "bg-transparent text-emerald-800 hover:bg-gray-50"
						}`}
					>
						{i + 1}
					</button>,
				);
			}
			return buttons;
		}

		buttons.push(
			<button
				type="button"
				key={0}
				onClick={() => table.setPageIndex(0)}
				className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					currentPage === 0
						? "bg-emerald-600 text-white hover:bg-emerald-700"
						: "bg-transparent text-emerald-800 hover:bg-gray-50"
				}`}
			>
				1
			</button>,
		);

		if (currentPage > 3) {
			buttons.push(
				<span
					key="ellipsis-start"
					className="px-2 font-semibold text-emerald-800"
				>
					...
				</span>,
			);
		}

		const start = Math.max(1, currentPage - 1);
		const end = Math.min(pageCount - 2, currentPage + 1);

		for (let i = start; i <= end; i++) {
			if (i === 0 || i === pageCount - 1) continue;

			buttons.push(
				<button
					type="button"
					key={i}
					onClick={() => table.setPageIndex(i)}
					className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
						currentPage === i
							? "bg-emerald-600 text-white hover:bg-emerald-700"
							: "bg-transparent text-emerald-800 hover:bg-gray-50"
					}`}
				>
					{i + 1}
				</button>,
			);
		}

		if (currentPage < pageCount - 4) {
			buttons.push(
				<span
					key="ellipsis-end"
					className="px-2 font-semibold text-emerald-800"
				>
					...
				</span>,
			);
		}

		buttons.push(
			<button
				type="button"
				key={pageCount - 1}
				onClick={() => table.setPageIndex(pageCount - 1)}
				className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					currentPage === pageCount - 1
						? "bg-emerald-600 text-white hover:bg-emerald-700"
						: "bg-transparent text-emerald-800 hover:bg-gray-50"
				}`}
			>
				{pageCount}
			</button>,
		);

		return buttons;
	};

	if (pageCount <= 1) return null;

	return (
		<div className="flex flex-col items-end justify-center">
			<div className="mt-6 flex flex-row items-center gap-1" {...rest}>
				{renderPageButtons()}
			</div>
		</div>
	);
}
