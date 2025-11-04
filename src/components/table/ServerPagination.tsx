type ServerPaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
} & React.ComponentPropsWithoutRef<"div">;

export default function ServerPagination({
	currentPage,
	totalPages,
	onPageChange,
	...rest
}: ServerPaginationProps) {
	const renderPageButtons = () => {
		const buttons = [];
		const pageIndex = currentPage - 1;

		if (totalPages <= 7) {
			for (let i = 0; i < totalPages; i++) {
				buttons.push(
					<button
						type="button"
						key={i}
						onClick={() => onPageChange(i + 1)}
						className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
							pageIndex === i
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
				onClick={() => onPageChange(1)}
				className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					pageIndex === 0
						? "bg-emerald-600 text-white hover:bg-emerald-700"
						: "bg-transparent text-emerald-800 hover:bg-gray-50"
				}`}
			>
				1
			</button>,
		);

		if (pageIndex > 2) {
			buttons.push(
				<span
					key="ellipsis-start"
					className="px-2 font-semibold text-emerald-800"
				>
					...
				</span>,
			);
		}

		const start = Math.max(1, pageIndex - 1);
		const end = Math.min(totalPages - 2, pageIndex + 1);

		for (let i = start; i <= end; i++) {
			buttons.push(
				<button
					type="button"
					key={i}
					onClick={() => onPageChange(i + 1)}
					className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
						pageIndex === i
							? "bg-emerald-600 text-white hover:bg-emerald-700"
							: "bg-transparent text-emerald-800 hover:bg-gray-50"
					}`}
				>
					{i + 1}
				</button>,
			);
		}

		if (pageIndex < totalPages - 3) {
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
				key={totalPages - 1}
				onClick={() => onPageChange(totalPages)}
				className={`h-8 w-8 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					pageIndex === totalPages - 1
						? "bg-emerald-600 text-white hover:bg-emerald-700"
						: "bg-transparent text-emerald-800 hover:bg-gray-50"
				}`}
			>
				{totalPages}
			</button>,
		);

		return buttons;
	};

	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col items-end justify-center">
			<div className="mt-6 flex flex-row items-center gap-1" {...rest}>
				{renderPageButtons()}
			</div>
		</div>
	);
}
