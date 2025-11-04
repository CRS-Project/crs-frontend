import {
	type ColumnDef,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import TBody from "./TBody";
import THead from "./THead";

type TableProps<T extends object> = {
	data: T[];
	columns: ColumnDef<T>[];
	isLoading?: boolean;
	sorting?: SortingState;
	setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
} & React.ComponentPropsWithoutRef<"div">;

export default function Table<T extends object>({
	data,
	columns,
	isLoading = false,
	sorting,
	setSorting,
	...rest
}: TableProps<T>) {
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
	});

	return (
		<div className="w-full" {...rest}>
			<div className="overflow-x-auto">
				<table className="w-full min-w-full">
					<THead table={table} sortable={true} />
					<TBody table={table} isLoading={isLoading} />
				</table>
			</div>
		</div>
	);
}
