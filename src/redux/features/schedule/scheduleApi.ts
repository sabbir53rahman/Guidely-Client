import { baseApi } from "@/redux/baseApi";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMySchedules: builder.query({
      query: () => ({
        url: "/schedules/me",
        method: "GET",
      }),
      providesTags: ["Schedule"],
    }),

    createSchedule: builder.mutation({
      query: (scheduleData) => ({
        url: "/schedules",
        method: "POST",
        body: scheduleData,
      }),
      // Invalidates 'Schedule' so `getMySchedules` automatically refetches
      invalidatesTags: ["Schedule"],
    }),

    updateSchedule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/schedules/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Schedule"],
    }),

    deleteSchedule: builder.mutation({
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
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} = scheduleApi;
