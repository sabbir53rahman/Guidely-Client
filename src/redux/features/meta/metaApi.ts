import { baseApi } from "@/redux/baseApi";
import { ApiResponse, IOverviewStats } from "@/types";

// --- API Definition ---

export const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<ApiResponse<IOverviewStats>, void>({
      query: () => ({
        url: "/meta/overview",
        method: "GET",
      }),
      providesTags: ["Overview"],
    }),
  }),
});

export const { useGetOverviewStatsQuery } = metaApi;
