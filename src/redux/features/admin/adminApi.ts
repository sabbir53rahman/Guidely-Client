import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, PaginatedResponse, User, AdminStats } from "@/types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<ApiResponse<AdminStats>, void>({
      query: () => "/admin/stats",
      providesTags: ["Admin"],
    }),
    getAllUsers: builder.query<
      PaginatedResponse<User>,
      { page?: number; limit?: number; role?: string; search?: string }
    >({
      query: (params = {}) => ({
        url: "/admin/users",
        params,
      }),
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation<
      ApiResponse<User>,
      { userId: string; role: string }
    >({
      query: ({ userId, ...data }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserStatus: builder.mutation<ApiResponse<User>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getPaymentsOverview: builder.query<
      ApiResponse<{
        totalRevenue: number;
        monthlyRevenue: number[];
        recentTransactions: {
          id: string;
          amount: number;
          student: string;
          mentor: string;
          date: string;
        }[];
      }>,
      void
    >({
      query: () => "/admin/payments",
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useToggleUserStatusMutation,
  useDeleteUserMutation,
  useGetPaymentsOverviewQuery,
} = adminApi;
