export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface ErrorResponse {
  message: string;
  errors: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: ErrorResponse;
  success: boolean;
}
