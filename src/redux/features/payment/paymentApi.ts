import { baseApi } from "@/redux/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: "/payments/create-checkout-session",
        method: "POST",
        body: { bookingId },
      }),
      invalidatesTags: ["Payment", "Booking"],
    }),
    getMyPayments: builder.query({
      query: () => "/payments/me",
      providesTags: ["Payment"],
    }),
    verifyPayment: builder.query({
      query: (sessionId: string) => ({
        url: `/payments/verify-payment?sessionId=${sessionId}`,
        method: "GET",
      }),
      providesTags: ["Payment", "Booking"],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetMyPaymentsQuery,
  useVerifyPaymentQuery,
} = paymentApi;
