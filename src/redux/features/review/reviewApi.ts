import { baseApi } from "@/redux/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/reviews",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review", "Mentor"], // Re-fetch reviews and mentor (for updated rating)
    }),
    getMentorReviews: builder.query({
      query: (mentorId) => `/reviews/mentor/${mentorId}`,
      providesTags: ["Review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetMentorReviewsQuery } = reviewApi;
