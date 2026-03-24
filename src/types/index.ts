// ─── User & Auth ─────────────────────────────────────────────────────────────
export type UserRole = "student" | "mentor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string | UserRole;
  avatar?: string | null;
  image?: string | null;
  isVerified?: boolean;
  status?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Mentor ───────────────────────────────────────────────────────────────────
export interface Review {
  _id: string;
  student: Pick<User, "id" | "name" | "avatar">;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Mentor {
  id: string;
  userId: string;
  user: User;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  registrationNumber?: string | null;
  experience: number;
  bio?: string | null;
  expertise?: string | null;
  averageRating: number;
  isAvailable: boolean;
  isDeleted: boolean;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

// ─── Availability ─────────────────────────────────────────────────────────────
export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: TimeSlot[];
}

// ─── Booking / Session ───────────────────────────────────────────────────────
export type SessionStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Session {
  _id: string;
  mentor: Mentor;
  student: User;
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  topic: string;
  notes?: string;
  meetingLink?: string;
  totalAmount: number;
  isPaid: boolean;
  review?: Review;
  createdAt: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  totalMentors: number;
  totalSessions: number;
  totalRevenue: number;
  pendingSessions: number;
  completedSessions: number;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Query Params ─────────────────────────────────────────────────────────────
export interface MentorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minRate?: number;
  maxRate?: number;
  rating?: number;
  sortBy?: "rating" | "hourlyRate" | "totalSessions";
  sortOrder?: "asc" | "desc";
}

export interface SessionQueryParams {
  page?: number;
  limit?: number;
  status?: SessionStatus;
  role?: "student" | "mentor";
}
