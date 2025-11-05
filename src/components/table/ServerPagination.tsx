import { ChevronLeft, ChevronRight } from "lucide-react";

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
						className={`h-10 w-10 cursor-pointer rounded-md text-sm font-medium transition-colors ${
							pageIndex === i
								? "bg-primary-500 text-white hover:bg-primary-600"
								: "bg-transparent text-primary-700 hover:bg-gray-50"
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
				className={`h-10 w-10 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					pageIndex === 0
						? "bg-primary-500 text-white hover:bg-primary-600"
						: "bg-transparent text-primary-700 hover:bg-gray-50"
				}`}
			>
				1
			</button>,
		);

		if (pageIndex > 2) {
			buttons.push(
				<span
					key="ellipsis-start"
					className="px-2 font-semibold text-primary-700"
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
					className={`h-10 w-10 cursor-pointer rounded-md text-sm font-medium transition-colors ${
						pageIndex === i
							? "bg-primary-500 text-white hover:bg-primary-600"
							: "bg-transparent text-primary-700 hover:bg-gray-50"
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
					className="px-2 font-semibold text-primary-700"
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
				className={`h-10 w-10 cursor-pointer rounded-md text-sm font-medium transition-colors ${
					pageIndex === totalPages - 1
						? "bg-primary-500 text-white hover:bg-primary-600"
						: "bg-transparent text-primary-700 hover:bg-gray-50"
				}`}
			>
				{totalPages}
			</button>,
		);

		return buttons;
	};

	if (totalPages <= 1) return null;

	const canGoPrevious = currentPage > 1;
	const canGoNext = currentPage < totalPages;

	return (
		<div className="flex flex-col items-end justify-center">
			<div className="mt-6 flex flex-row items-center gap-1" {...rest}>
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={!canGoPrevious}
					className={`h-10 px-3 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
						canGoPrevious
							? "bg-transparent text-primary-700 hover:bg-gray-50 cursor-pointer"
							: "bg-transparent text-gray-400 cursor-not-allowed"
					}`}
					aria-label="Previous page"
				>
					<ChevronLeft className="w-4 h-4" />
				</button>

				{renderPageButtons()}

				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={!canGoNext}
					className={`h-10 px-3 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
						canGoNext
							? "bg-transparent text-primary-700 hover:bg-gray-50 cursor-pointer"
							: "bg-transparent text-gray-400 cursor-not-allowed"
					}`}
					aria-label="Next page"
				>
					<ChevronRight className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}
