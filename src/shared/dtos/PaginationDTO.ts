export interface PaginationQuery {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'admin' | 'user';
}

export interface PaginationResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
