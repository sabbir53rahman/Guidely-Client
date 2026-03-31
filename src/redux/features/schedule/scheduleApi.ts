import { ApiResponse, PaginatedResponse, Schedule } from "@/types";
import { baseApi } from "@/redux/baseApi";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySchedules: builder.query<
      PaginatedResponse<Schedule>,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        dayOfWeek?: string;
        sortBy?: string;
        sortOrder?: string;
      } | void
    >({
      query: (params) => ({
        url: "/schedules/me",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Schedule"],
    }),

    getAllSchedules: builder.query<
      PaginatedResponse<Schedule>,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        dayOfWeek?: string;
        mentorId?: string;
        sortBy?: string;
        sortOrder?: string;
      } | void
    >({
      query: (params) => ({
        url: "/schedules",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Schedule"],
    }),

    createSchedule: builder.mutation<
      ApiResponse<Schedule>,
      { dayOfWeek: string; startTime: string; endTime: string }
    >({
      query: (scheduleData) => ({
        url: "/schedules",
        method: "POST",
        body: scheduleData,
      }),
      // Invalidates 'Schedule' so `getMySchedules` automatically refetches
      invalidatesTags: ["Schedule"],
    }),

    updateSchedule: builder.mutation<
      ApiResponse<Schedule>,
      { id: string; dayOfWeek?: string; startTime?: string; endTime?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/schedules/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),

    deleteSchedule: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/schedules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Schedule"],
    }),
  }),
});

export const {
  useGetMySchedulesQuery,
  useGetAllSchedulesQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
