import { baseApi } from "@/redux/baseApi";

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
    getMentorReviews: builder.query({
      query: (mentorId) => `/reviews/mentor/${mentorId}`,
      providesTags: ["Review"],
    }),
    getMyReviews: builder.query({
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
