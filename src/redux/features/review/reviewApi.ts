import { baseApi } from "@/redux/baseApi";
import { PaginatedResponse, Review } from "@/types";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review", "Mentor", "Booking"], // Re-fetch reviews, mentor, and bookings for status updates
    }),
    getMentorReviews: builder.query<PaginatedResponse<Review>, string>({
      query: (mentorId) => `/reviews/mentor/${mentorId}`,
      providesTags: ["Review"],
    }),
    getMyReviews: builder.query<PaginatedResponse<Review>, { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/reviews/me",
        method: "GET",
        params,
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const { 
  useCreateReviewMutation, 
  useGetMentorReviewsQuery, 
  useGetMyReviewsQuery 
} = reviewApi;
