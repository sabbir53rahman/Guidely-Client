import { baseApi } from "@/redux/baseApi";
import type {
  ApiResponse,
  Session,
  PaginatedResponse,
  SessionQueryParams,
  Review,
} from "@/types";

interface BookSessionRequest {
  mentorId: string;
  date: string;
  startTime: string;
  endTime: string;
  topic: string;
  notes?: string;
}

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    bookSession: builder.mutation<ApiResponse<Session>, BookSessionRequest>({
      query: (data) => ({
        url: "/sessions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session", "Booking"],
    }),
    getMySessions: builder.query<
      PaginatedResponse<Session>,
      SessionQueryParams
    >({
      query: (params = {}) => ({
        url: "/sessions/my",
        params,
      }),
      providesTags: ["Session"],
    }),
    getSessionById: builder.query<ApiResponse<Session>, string>({
      query: (id) => `/sessions/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Session", id }],
    }),
    cancelSession: builder.mutation<ApiResponse<Session>, string>({
      query: (id) => ({
        url: `/sessions/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Session"],
    }),
    confirmSession: builder.mutation<ApiResponse<Session>, string>({
      query: (id) => ({
        url: `/sessions/${id}/confirm`,
        method: "PATCH",
      }),
      invalidatesTags: ["Session"],
    }),
    completeSession: builder.mutation<ApiResponse<Session>, string>({
      query: (id) => ({
        url: `/sessions/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["Session"],
    }),

    // Reviews
    addReview: builder.mutation<
      ApiResponse<Review>,
      { sessionId: string; rating: number; comment: string }
    >({
      query: ({ sessionId, ...data }) => ({
        url: `/sessions/${sessionId}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session", "Mentor"],
    }),

    // Admin
    getAllSessions: builder.query<
      PaginatedResponse<Session>,
      SessionQueryParams
    >({
      query: (params = {}) => ({
        url: "/sessions",
        params,
      }),
      providesTags: ["Session"],
    }),
    updateSessionStatus: builder.mutation<
      ApiResponse<Session>,
      { id: string; status: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/sessions/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),
  }),
});

export const {
  useBookSessionMutation,
  useGetMySessionsQuery,
  useGetSessionByIdQuery,
  useCancelSessionMutation,
  useConfirmSessionMutation,
  useCompleteSessionMutation,
  useAddReviewMutation,
  useGetAllSessionsQuery,
  useUpdateSessionStatusMutation,
} = sessionApi;
