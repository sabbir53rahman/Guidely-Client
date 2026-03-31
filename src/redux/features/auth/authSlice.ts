import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, UserRole } from "@/types";
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true, // Start in initialization state
};

interface JWTPayload {
  userId?: string;
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User | null;
        accessToken: string;
        refreshToken?: string;
      }>,
    ) => {
      const { user, accessToken } = action.payload;
      state.token = accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;

      if (user) {
        state.user = user;
      } else {
        // Decode token to get user info if not provided
        try {
          const decoded = jwtDecode<JWTPayload>(accessToken);
          state.user = {
            id: decoded.userId || decoded.id || "",
            name: decoded.name || "",
            email: decoded.email || "",
            role: (decoded.role?.toLowerCase() as UserRole) || "student",
            isVerified: true,
            createdAt: new Date().toISOString(),
          };
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setCredentials, logout, setLoading, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
