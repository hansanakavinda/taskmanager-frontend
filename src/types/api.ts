export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

interface ValidationError {
  location: string;
  msg: string;
  path: string;
  type: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: ValidationError[];
}


