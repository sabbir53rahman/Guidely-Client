import { ApiResponse, Schedule } from "@/types";
import { baseApi } from "@/redux/baseApi";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySchedules: builder.query<ApiResponse<Schedule[]>, undefined>({
      query: () => ({
        url: "/schedules/me",
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),

    getAllSchedules: builder.query<ApiResponse<Schedule[]>, undefined>({
      query: () => ({
        url: "/schedules",
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),

    createSchedule: builder.mutation<ApiResponse<Schedule>, Partial<Schedule>>({
      query: (scheduleData) => ({
        url: "/schedules",
        method: "POST",
        body: scheduleData,
      }),
      // Invalidates 'Schedule' so `getMySchedules` automatically refetches
      invalidatesTags: ["Schedule"],
    }),

    updateSchedule: builder.mutation<ApiResponse<Schedule>, Partial<Schedule> & { id: string }>({
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
