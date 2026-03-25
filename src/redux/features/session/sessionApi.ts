import { baseApi } from "@/redux/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking", "Schedule"], // Booking uses a schedule slot
    }),
    getMyBookings: builder.query({
      query: () => "/bookings/me",
      providesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Booking", "Schedule"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetMyBookingsQuery,
  useCancelBookingMutation,
} = bookingApi;
