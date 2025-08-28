// Common Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export type ThemeMode = 'light' | 'dark';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  slug: string;
  dateAdded: string;
}

export interface WishlistState {
  items: WishlistItem[];
}
