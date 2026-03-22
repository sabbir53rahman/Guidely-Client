import { baseApi } from "@/redux/baseApi";
import type { ApiResponse, User } from "@/types";
import { setCredentials } from "./authSlice";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

interface RegisterResponse extends LoginResponse {
  user: User;
  student?: Record<string, unknown>; // Student model from prisma
  mentor?: Record<string, unknown>; // Mentor model from prisma
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              setCredentials({
                user: data.data.user || null,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              }),
            );
          }
        } catch {
          // Handle error if needed
        }
      },
    }),
    registerStudent: builder.mutation<
      ApiResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (data) => ({
        url: "/auth/register-student",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              }),
            );
          }
        } catch {
          // Handle error
        }
      },
    }),
    registerMentor: builder.mutation<
      ApiResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (data) => ({
        url: "/auth/register-mentor",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              setCredentials({
                user: data.data.user,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              }),
            );
          }
        } catch {
          // Handle error
        }
      },
    }),
    getMe: builder.query<ApiResponse<User>, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    changePassword: builder.mutation<
      ApiResponse<null>,
      { currentPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterStudentMutation,
  useRegisterMentorMutation,
  useGetMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
