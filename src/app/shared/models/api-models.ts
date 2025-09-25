export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ErrorResponse {
  title: string;
  errors: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: ErrorResponse;
  success: boolean;
}
