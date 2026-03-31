import { baseApi } from "@/redux/baseApi";
import type {
  ApiResponse,
  PaginatedResponse,
  User,
  IAdminStats,
} from "@/types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<ApiResponse<IAdminStats>, void>({
      query: () => "/admins/stats",
      providesTags: ["Admin"],
    }),
    getAllUsers: builder.query<
      PaginatedResponse<User>,
      {
        page?: number;
        limit?: number;
        role?: string;
        search?: string;
        status?: string;
      }
    >({
      query: (params = {}) => ({
        url: "/admins/users",
        params,
      }),
      providesTags: ["User"],
    }),
    updateUserRole: builder.mutation<
      ApiResponse<User>,
      { userId: string; role: string }
    >({
      query: ({ userId, role }) => ({
        url: `/admins/users/${userId}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserStatus: builder.mutation<ApiResponse<User>, string>({
      query: (userId) => ({
        url: `/admins/users/${userId}/toggle-status`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (userId) => ({
        url: `/admins/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getPaymentsOverview: builder.query<
      ApiResponse<{
        totalRevenue: number;
        monthlyRevenue: {
          month: string;
          year: number;
          revenue: number;
        }[];
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
      query: () => "/admins/payments",
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
