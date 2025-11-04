import { useQuery } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import * as React from "react";
import api from "@/lib/api";

export type WasteBankItem = {
	id: string;
	username: string;
	email: string;
	role: string;
	phone_number: string;
	institution: string;
	address: string;
	city: string;
	province: string;
	points: number;
	balance: number;
	location: {
		latitude: number;
		longitude: number;
	};
	is_email_verified: boolean;
	is_accepting_customer: boolean;
	created_at: string;
	updated_at: string;
	is_agreed_to_terms: boolean;
	waste_bank_profile: {
		id: string;
		user_id: string;
		total_waste_weight: number;
		total_workers: number;
		open_time: string;
		close_time: string;
	};
	storage_info: {
		storages: {
			id: string;
			user_id: string;
			length: number;
			width: number;
			height: number;
			volume: number;
			is_for_recycled_material: boolean;
		}[];
		total_volume: number;
		total_count: number;
	};
};

export type WasteBankApiResponse = {
	data: WasteBankItem[];
	paging: {
		page: number;
		size: number;
		total_item: number;
		total_page: number;
	};
};

export type WasteBankQueryParams = {
	role?: string;
	institution?: string;
	order_by?: string;
	order_dir?: string;
	page?: number;
	size?: number;
	province?: string;
	city?: string;
	start_month?: string;
	end_month?: string;
};

export function useWasteBankTableQuery() {
	const [search, setSearch] = React.useState("");
	const [roleFilter, setRoleFilter] = React.useState<string>("");
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
	}, [roleFilter, sortBy]);

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

	const queryParams: WasteBankQueryParams = React.useMemo(() => {
		const params: WasteBankQueryParams = {
			page: currentPage,
			size: perPage,
			role: "waste_bank",
		};

		if (debouncedSearch.trim()) {
			params.institution = debouncedSearch.trim();
		}

		if (roleFilter) {
			params.role = roleFilter;
		}

		if (sortBy) {
			params.order_by = sortBy;
			if (sortDir) params.order_dir = sortDir;
		}

		return params;
	}, [debouncedSearch, roleFilter, sortBy, sortDir, currentPage, perPage]);

	const {
		data: apiResponse,
		isLoading,
		error,
		isFetching,
	} = useQuery<WasteBankApiResponse>({
		queryKey: ["wasteBankData", queryParams],
		queryFn: async () => {
			// return getMockWasteBankData(queryParams);

			const res = await api.get("/api/users", {
				params: queryParams,
			});
			return res.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});

	const roleOptions = React.useMemo(() => {
		if (!apiResponse?.data) return [{ value: "", label: "Semua Role" }];

		const uniqueRoles = Array.from(
			new Set(apiResponse.data.map((item) => item.role)),
		);

		return [
			{ value: "", label: "Semua Role" },
			...uniqueRoles.map((role) => ({
				value: role,
				label: formatRoleName(role),
			})),
		];
	}, [apiResponse?.data]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleRoleChange = (newRole: string) => {
		setRoleFilter(newRole);
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
		setRoleFilter("");
		setSortBy("");
		setCurrentPage(1);
	};

	return {
		search,
		roleFilter,
		sortBy,
		perPage,
		currentPage,
		sorting,

		data: apiResponse?.data || [],
		totalPages: apiResponse?.paging?.total_page || 1,
		totalResults: apiResponse?.paging?.total_item || 0,
		roleOptions,

		isLoading,
		isFetching,
		error,

		handleSearchChange,
		handleRoleChange,
		handleSortChange,
		handlePerPageChange,
		handlePageChange,
		handleClearFilters,
		setSorting,
	};
}

export const entriesOptions = [
	{ value: 5, label: "5" },
	{ value: 10, label: "10" },
	{ value: 15, label: "15" },
	{ value: 20, label: "20" },
	{ value: 25, label: "25" },
];

export const sortOptions = [
	{ value: "desc", label: "Descending" },
	{ value: "asc", label: "Ascending" },
];

const roleLabels: Record<string, string> = {
	waste_bank_central: "BSI",
	waste_bank_unit: "BSU",
};

export function formatRoleName(role: string): string {
	return roleLabels[role] || role;
}
