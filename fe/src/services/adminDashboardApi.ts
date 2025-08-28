import { api } from './api';

// Dashboard types
export interface DashboardOverview {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  processingOrders: number;
}

export interface MonthlyStats {
  users: number;
  orders: number;
  revenue: number;
}

export interface GrowthStats {
  users: number;
  orders: number;
  revenue: number;
}

export interface TopProduct {
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
  };
  totalSold: number;
  totalRevenue: number;
}

export interface DashboardStats {
  overview: DashboardOverview;
  monthly: MonthlyStats;
  growth: GrowthStats;
  topProducts: TopProduct[];
}

export interface DashboardResponse {
  status: string;
  data: DashboardStats;
}

export interface DetailedStatsQuery {
  startDate: string;
  endDate: string;
  groupBy?: 'hour' | 'day' | 'week' | 'month';
}

export interface OrderStat {
  period: string;
  orderCount: number;
  revenue: number;
}

export interface UserStat {
  period: string;
  newUsers: number;
}

export interface DetailedStats {
  orders: OrderStat[];
  users: UserStat[];
}

export interface DetailedStatsResponse {
  status: string;
  data: DetailedStats;
}

export const adminDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get dashboard stats
    getDashboardStats: builder.query<DashboardResponse, void>({
      query: () => ({
        url: '/admin/dashboard',
        method: 'GET',
      }),
      providesTags: ['AdminDashboard'],
    }),

    // Get detailed stats
    getDetailedStats: builder.query<DetailedStatsResponse, DetailedStatsQuery>({
      query: (params) => ({
        url: '/admin/stats',
        method: 'GET',
        params,
      }),
      providesTags: ['AdminStats'],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetDetailedStatsQuery } =
  adminDashboardApi;
