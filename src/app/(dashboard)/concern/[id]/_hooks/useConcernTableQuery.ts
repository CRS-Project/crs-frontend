import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import * as React from "react";
import api from "@/service/api";
import type { PaginatedApiResponse, PaginationQueryParams } from "@/types/api";
import type { Concern } from "@/types/concern";

export function useConcernTableQuery(id: string) {
	const [search, setSearch] = React.useState("");
	const [sortBy, setSortBy] = React.useState<string>("");
	const [sortDir, setSortDir] = React.useState<string>("");
	const [perPage, setPerPage] = React.useState(10);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [debouncedSearch, setDebouncedSearch] = React.useState(search);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
			setCurrentPage(1);
		}, 500);
		return () => clearTimeout(timer);
	}, [search]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: reset page when params change
	React.useEffect(() => {
		setCurrentPage(1);
	}, [sortBy, perPage]);

	React.useEffect(() => {
		if (sorting.length > 0) {
			const sort = sorting[0];
			setSortBy(`${sort.id}`);
			setSortDir(sort.desc ? "desc" : "asc");
		} else {
			setSortBy("");
			setSortDir("");
		}
	}, [sorting]);

	const queryParams: PaginationQueryParams = React.useMemo(() => {
		const params: PaginationQueryParams = {
			page: currentPage,
			take: perPage,
		};

		if (debouncedSearch.trim()) {
			params.filter = debouncedSearch.trim();
		}

		if (sortBy) {
			params.sort_by = sortBy;
			if (sortDir) params.sort = sortDir;
		}

		return params;
	}, [debouncedSearch, sortBy, sortDir, currentPage, perPage]);

	const {
		data: apiResponse,
		isLoading,
		error,
		isFetching,
	} = useQuery<PaginatedApiResponse<Concern[]>>({
		queryKey: ["concern", id, queryParams],
		queryFn: async () => {
			const filters: string[] = [];
			const filterBy: string[] = [];

			if (debouncedSearch.trim()) {
				filters.push(debouncedSearch.trim());
				filterBy.push("search");
			}

			filters.push(id);
			filterBy.push("package_id");

			const res = await api.get(`/v1/discipline-group`, {
				params: {
					...queryParams,
					filter: filters.join(","),
					filter_by: filterBy.join(","),
				},
			});
			return res.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSortChange = (newSort: string) => {
		setSortBy(newSort);
	};

	const handlePerPageChange = (value: string) => {
		setPerPage(Number(value));
		setCurrentPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	const handleClearFilters = () => {
		setSearch("");
		setSortBy("");
		setCurrentPage(1);
	};

	return {
		search,
		sortBy,
		perPage,
		currentPage,
		sorting,

		data: apiResponse?.data || [],
		totalPages: apiResponse?.meta?.total_page || 1,
		totalData: apiResponse?.meta?.total_data || 0,

		isLoading,
		isFetching,
		error,

		handleSearchChange,
		handleSortChange,
		handlePerPageChange,
		handlePageChange,
		handleClearFilters,
		setSorting,
	};
}
