import { baseApi } from "@/redux/baseApi";
import type {
  ApiResponse,
  Mentor,
  PaginatedResponse,
  AvailabilityDay,
} from "@/types";

const mentorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public
    getAllMentors: builder.query<
      PaginatedResponse<Mentor>,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        expertise?: string;
        isAvailable?: boolean;
        experience?: number;
        sortBy?: string;
        sortOrder?: string;
      } | void
    >({
      query: (params) => ({
        url: "/mentors",
        params: params || undefined,
      }),
      providesTags: ["Mentor"],
    }),

    getMentorById: builder.query<ApiResponse<Mentor>, string>({
      query: (id) => `/mentors/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Mentor", id }],
    }),

    // Mentor-only
    createMentorProfile: builder.mutation<ApiResponse<Mentor>, Partial<Mentor>>(
      {
        query: (data) => ({
          url: "/mentors",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["Mentor"],
      },
    ),

    updateMentorProfile: builder.mutation<
      ApiResponse<Mentor>,
      { id: string; data: Partial<Mentor> }
    >({
      query: ({ id, data }) => ({
        url: `/mentors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [
        { type: "Mentor", id },
        "Mentor",
      ],
    }),

    getMentorAvailability: builder.query<
      ApiResponse<AvailabilityDay[]>,
      string
    >({
      query: (mentorId) => `/mentors/${mentorId}/availability`,
    }),

    setMentorAvailability: builder.mutation<
      ApiResponse<AvailabilityDay[]>,
      AvailabilityDay[]
    >({
      query: (data) => ({
        url: "/mentors/availability",
        method: "PUT",
        body: { availability: data },
      }),
    }),

    getMyMentorProfile: builder.query<ApiResponse<Mentor>, void>({
      query: () => "/mentors/me",
      providesTags: ["Mentor"],
    }),
  }),
});

export const {
  useGetAllMentorsQuery,
  useGetMentorByIdQuery,
  useCreateMentorProfileMutation,
  useUpdateMentorProfileMutation,
  useGetMentorAvailabilityQuery,
  useSetMentorAvailabilityMutation,
  useGetMyMentorProfileQuery,
} = mentorApi;
