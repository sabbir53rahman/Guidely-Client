import { baseApi } from "@/redux/baseApi";
import { PaginatedResponse, IBooking } from "@/types";

// Define booking payload type based on backend interface
interface ICreateBookingPayload {
  mentorId: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // For Admin / Super Admin
    getAllBookings: builder.query<
      PaginatedResponse<IBooking>,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        status?: string;
        mentorId?: string;
        studentId?: string;
        sortBy?: string;
        sortOrder?: string;
      } | void
    >({
      query: (params) => ({
        url: "/bookings",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Booking"],
    }),

    // Get single booking by ID
    getBookingById: builder.query<IBooking, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: ["Booking"],
    }),

    // For Student & Mentor
    getMyBookings: builder.query<
      PaginatedResponse<IBooking>,
      {
        page?: number;
        limit?: number;
        status?: string;
        searchTerm?: string;
        sortBy?: string;
        sortOrder?: string;
      } | void
    >({
      query: (params) => ({
        url: "/bookings/me",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Booking"],
    }),

    // Create a new Booking (Student)
    createBooking: builder.mutation<IBooking, ICreateBookingPayload>({
      query: (bookingPayload) => ({
        url: "/bookings",
        method: "POST",
        body: bookingPayload,
      }),
      invalidatesTags: ["Booking"],
    }),

    // Update booking status or details
    updateBookingStatus: builder.mutation<
      IBooking,
      { id: string; status?: string; paymentStatus?: string; notes?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    // Cancel a booking (Student / Mentor / Admin)
    cancelBooking: builder.mutation<IBooking, string>({
      query: (id: string) => ({
        url: `/bookings/cancel/${id}`, // Backend uses URL parameter
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    // Delete a booking
    deleteBooking: builder.mutation<IBooking, string>({
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
  useGetBookingByIdQuery,
  useGetMyBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingStatusMutation,
  useCancelBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
