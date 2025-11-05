export interface PaginatedApiResponse<DataType> {
	success: boolean;
	message: string;
	code: number;
	data: DataType;
	meta: {
		take: number;
		page: number;
		total_data: number;
		total_page: number;
		sort?: string;
		sort_by?: string;
		filter?: string;
		filter_by?: string;
	};
}

export type ApiResponse<T> = {
	success: boolean;
	message: string;
	code: number;
	data: T;
};

export type ApiError = {
	status: boolean;
	message: string;
	error: string;
};

export type UninterceptedApiError = {
	code: number;
	status: boolean;
	message: string | Record<string, string[]>;
};

export type PaginationQueryParams = {
	take?: number;
	page?: number;
	sort?: string;
	sort_by?: string;
	filter?: string;
	filter_by?: string;
};
