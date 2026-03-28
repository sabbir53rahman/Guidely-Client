import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For Admin / Super Admin
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    // For Student & Mentor
    getMyBookings: builder.query({
      query: () => ({
        url: "/bookings/me",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    // Create a new Booking (Student)
    createBooking: builder.mutation({
      query: (bookingPayload) => ({
        url: "/bookings",
        method: "POST",
        body: bookingPayload,
      }),
      invalidatesTags: ["Booking"],
    }),

    updateBookingStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    // Cancel a booking (Student / Mentor / Admin)
    cancelBooking: builder.mutation({
      query: (id: string) => ({
        url: `/bookings/cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Delete a booking
    deleteBooking: builder.mutation({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
