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
      query: ({ id, status, paymentStatus }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        // Optional payload depends on what needs updating
        body: { status, paymentStatus },
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
} = bookingApi;
